import axios from "axios";
import { config } from "../helper/axios.config";

export const getAllUsers = async () => {
  const data = await axios.get(`http://localhost:5000/api/v1/users/all`, config);
  return data;
};

export const getAllChats =async (user) => {
  const data = await axios.get(
    `http://localhost:5000/api/v1/msg/getAllmsg?user=${user}`
  );
  return data;
};

export const getAllPastMessage = async (userId, to) => {
  const data = await axios.get(
    `http://localhost:5000/api/v1/msg/getmsg?from=${userId}&to=${to}`
  );
  return data;
};

export const sendMsg = async (userId, to, text, time) => {
  const data = await axios.post(`http://localhost:5000/api/v1/msg/addmsg`, {
    from: userId,
    to,
    message: {
      msg: text,
      fromSelf: userId,
      time,
    },
  });
  return data
};
