import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Habit } from "@shared/types/habit_types";
import { Auth0ContextInterface } from "@auth0/auth0-react";
import { Dailies } from "@shared/types/dailies_types";

export default class Api {
  client: AxiosInstance;
  api_token: string | undefined;
  api_url: string | undefined;
  auth0: Auth0ContextInterface;

  constructor(auth0: Auth0ContextInterface) {
    this.api_token = undefined;
    this.api_url = process.env.REACT_APP_BACKEND_URL;
    this.auth0 = auth0;

    // create client instance
    this.client = axios.create({
      baseURL: this.api_url,
    });

    // add interceptor to set token on every request
    this.client.interceptors.request.use(async (config) => {
      const token = await this.auth0.getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  //TODOS
  getTodos = async () => {
    return (await this.client.get("/api/todo")).data;
  };

  createTodo = async (title: string, description: string) => {
    return await this.client.post("/api/todo", {
      title,
      description,
    });
  };

  deleteTodo = async (id: number) => {
    return this.client.delete(`/api/todo?id=${id}`);
  };

  updateTodo = async (
    id: number,
    title: string | undefined,
    description: string | undefined,
    completed: boolean | undefined
  ) => {
    return this.client.put(`/api/todo?id=${id}`, {
      title,
      description,
      completed,
    });
  };
  //HABITS
  getHabits = async () => {
    const habits: Array<Habit> = (await this.client.get("/api/habit")).data
      .habits;
    for (const habit of habits) {
      if (habit.completion_dates)
        for (let i = 0; i < habit.completion_dates.length; i++) {
          habit.completion_dates[i] = new Date(habit.completion_dates[i]);
        }
    }
    return habits;
  };

  createHabit = async (title: string, description: string) => {
    return await this.client.post("/api/habit", {
      title,
      description,
      completion_count: 0,
      streak: 0,
      is_deleted: false,
    } as Habit);
  };

  completeHabit = async (id: number, completion_date: Date) => {
    return this.client.put(`/api/habit/increment?id=${id}`, {
      completion_date,
    });
  };

  deleteHabit = async (id: number) => {
    return this.client.delete(`/api/habit?id=${id}`);
  };

  //DAILIES
  getDailies = async () => {
    const dailiesArray: Array<Dailies> = (await this.client.get("/api/dailies"))
      .data.dailiesArray;
    for (const dailies of dailiesArray) {
      if (dailies.completion_dates)
        for (let i = 0; i < dailies.completion_dates.length; i++) {
          dailies.completion_dates[i] = new Date(dailies.completion_dates[i]);
        }
    }
    return dailiesArray;
  };

  createDailies = async (title: string, description: string) => {
    return await this.client.post("/api/dailies", {
      title,
      description,
      completion_count: 0,
      streak: 0,
      is_deleted: false,
    } as Dailies);
  };

  completeDailies = async (id: number, completion_date: Date) => {
    return this.client.put(`/api/dailies/increment?id=${id}`, {
      completion_date,
    });
  };

  deleteDailies = async (id: number) => {
    return this.client.delete(`/api/dailies?id=${id}`);
  };

  //USER
  login = async (username: string, password: string) => {
    return await this.client.post(
      "/api/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
  };

  register = async (name: string, password: string) => {
    return await this.client.post("/api/auth/register", {
      name,
      password,
    });
  };

  getUser = async () => {
    return (await this.client.get("/api/auth/user")).data;
  };
}
