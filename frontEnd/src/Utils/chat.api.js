import axios from "axios";
import { config } from "../helper/axios.config";

export const getAllUsers = () => {
  const data = axios.get(`http://localhost:5000/api/v1/users/all`, config)
  return data;
};

export const getAllChats = (user) => {
   const { data } = axios.post(
     `http://localhost:5000/api/v1/msg/getAllmsg`,
     { from: user.userId }, config
   );

   return data;
 };
