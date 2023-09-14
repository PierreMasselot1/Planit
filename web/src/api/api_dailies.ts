import { Dailies } from "@shared/types/dailies_types";
import axiosInstance from "./axios";

//DAILIES
export const fetchDailiesAPI = async () => {
  const dailiesArray: Array<Dailies> = (await axiosInstance.get("/api/dailies"))
    .data.dailiesArray;
  for (const dailies of dailiesArray) {
    if (dailies.completion_dates)
      for (let i = 0; i < dailies.completion_dates.length; i++) {
        dailies.completion_dates[i] = new Date(dailies.completion_dates[i]);
      }
  }
  return dailiesArray;
};

export const createDailiesAPI = async (title: string, description: string) => {
  return await axiosInstance.post("/api/dailies", {
    title,
    description,
    completion_count: 0,
    streak: 0,
    is_deleted: false,
  } as Dailies);
};

export const completeDailiesAPI = async (id: number, completion_date: Date) => {
  return axiosInstance.put(`/api/dailies/increment?id=${id}`, {
    completion_date,
  });
};

export const decrementDailiesAPI = async (id: number, date: Date) => {
  return axiosInstance.put(`/api/dailies/decrement?id=${id}`, {
    date,
  });
};

export const deleteDailiesAPI = async (id: number) => {
  return axiosInstance.delete(`/api/dailies?id=${id}`);
};
