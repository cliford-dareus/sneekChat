import axios from "axios";
import { config } from "../helper/axios.config";

export const getAllUsers = () => {
  const data = axios.get(`http://localhost:5000/api/v1/users/all`, config);
  return data;
};

export const getAllChats = (user) => {
  const data = axios.get(
    `http://localhost:5000/api/v1/msg/getAllmsg?user=${user}`);
  return data;
};

export const getAllPastMessage = (userId, to) => {
  const data = axios.get(
    `http://localhost:5000/api/v1/msg/getmsg?from=${userId}&to=${to}`
  );
  return data;
};
