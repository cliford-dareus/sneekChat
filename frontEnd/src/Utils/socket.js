import { io } from "socket.io-client";

const URL = "http://localhost:5000";
const socket = io(URL, { autoConnect: true });

const connectSocket = ({ username, userId }) => {
  socket.auth = { username, userId };
  socket.connect();
};

export { socket, connectSocket };
