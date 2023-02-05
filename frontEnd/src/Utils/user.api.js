import axios from "axios";
import { config } from "../helper/axios.config";

export const getAllUsers = async () => {
  const data = await axios.get(
    `http://localhost:5000/api/v1/users/all`,
    config
  );
  return data;
};
