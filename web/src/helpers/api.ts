import axios, { AxiosInstance } from "axios";
import { Habit } from "@shared/types/habit_types";

export default class Api {
  client: AxiosInstance | undefined;
  api_token: string | undefined;
  api_url: string | undefined;

  constructor() {
    this.api_token = undefined;
    this.api_url = process.env.REACT_APP_BACKEND_URL;
  }

  init = async (token: string) => {
    this.api_token = token;

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${this.api_token}`,
    };

    this.client = axios.create({
      baseURL: this.api_url,
      headers: headers,
    });

    return this.client;
  };

  //TODOS
  getTodos = async (token: string) => {
    return (await (await this.init(token)).get("/api/todo")).data;
  };

  createTodo = async (token: string, title: string, description: string) => {
    return (await this.init(token)).post("/api/todo", {
      title,
      description,
    });
  };

  deleteTodo = async (token: string, id: number) => {
    return (await this.init(token)).delete(`/api/todo?id=${id}`);
  };

  updateTodo = async (
    token: string,
    id: number,
    title: string | undefined,
    description: string | undefined,
    completed: boolean | undefined
  ) => {
    return (await this.init(token)).put(`/api/todo?id=${id}`, {
      title,
      description,
      completed,
    });
  };
  //HABITS
  getHabits = async (token: string) => {
    return (await (await this.init(token)).get("/api/habit")).data;
  };

  createHabit = async (token: string, title: string) => {
    return (await this.init(token)).post("/api/habit", {
      title,
      streak: 0,
      is_deleted: false,
      last_completed: undefined,
    } as Habit);
  };

  completeHabit = async (token: string, id: number) => {
    return (await this.init(token)).put(`/api/habit/increment?id=${id}`);
  };
}
