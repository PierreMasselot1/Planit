import axios, { AxiosInstance } from "axios";

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
}
