import { Habit } from "@shared/types/habit_types";
import axiosInstance from "./axios";

//HABITS
export const getHabitsAPI = async () => {
  const habits: Array<Habit> = (await axiosInstance.get("/api/habit")).data
    .habits;
  for (const habit of habits) {
    if (habit.completion_dates)
      for (let i = 0; i < habit.completion_dates.length; i++) {
        habit.completion_dates[i] = new Date(habit.completion_dates[i]);
      }
  }
  return habits;
};

export const createHabitAPI = async (title: string, description: string) => {
  return await axiosInstance.post("/api/habit", {
    title,
    description,
    completion_count: 0,
    streak: 0,
    is_deleted: false,
  } as Habit);
};

export const completeHabitAPI = async (id: number, completion_date: Date) => {
  return axiosInstance.put(`/api/habit/increment?id=${id}`, {
    completion_date,
  });
};

export const deleteHabitAPI = async (id: number) => {
  return axiosInstance.delete(`/api/habit?id=${id}`);
};
