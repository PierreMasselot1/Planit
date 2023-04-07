import axios, { AxiosInstance } from "axios";
import { Habit } from "@shared/types/habit_types";
import { Auth0ContextInterface } from "@auth0/auth0-react";

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
    return (await this.client.get("/api/habit")).data;
  };

  createHabit = async (title: string) => {
    return await this.client.post("/api/habit", {
      title,
      completion_count: 0,
      streak: 0,
      is_deleted: false,
      last_completed: undefined,
    } as Habit);
  };

  completeHabit = async (id: number) => {
    return this.client.put(`/api/habit/increment?id=${id}`);
  };
}
