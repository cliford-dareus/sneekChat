require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const morgan = require("morgan");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanatize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const messageRouter = require("./routes/message-routes");

const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

let users = [];

socketIO.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const userId = socket.handshake.auth.userId;
  // console.log(socket.handshake.auth)
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  socket.userId = userId;
  next();
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.username} ${socket.userId}user just connected!`);
  socket.join(socket.userId);

  socket.on("private_message", ({ msg, to }) => {
    socketIO.to(to).to(socket.userId).emit("private_message", {
      msg,
      from: socket.userId,
      to,
    });

    socketIO.to(to).emit("notification", {
      from: socket.userId,
      newMessage: true,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("combined"));
app.use(helmet());
app.use(xss());
app.use(mongoSanatize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/msg", messageRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleWare);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    http.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
