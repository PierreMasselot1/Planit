import { User } from "@shared/types/user_types";
import axiosInstance from "./axios";

export const loginAPI = async (
  username: string,
  password: string
): Promise<User> => {
  return await axiosInstance.post("/api/auth/login", {
    username,
    password,
  });
};

export const registerAPI = async (name: string, password: string) => {
  return await axiosInstance.post("/api/auth/register", {
    name,
    password,
  });
};

export const getUserAPI = async () => {
  return (await axiosInstance.get("/api/user", { withCredentials: true })).data;
};

export const logoutAPI = async () => {
  return await axiosInstance.post(
    "/api/auth/logout",
    {},
    { withCredentials: true }
  );
};
