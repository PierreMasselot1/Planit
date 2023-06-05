import axiosInstance from "./axios";

export const loginAPI = async (username: string, password: string) => {
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
