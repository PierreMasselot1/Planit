import { Todo } from "@shared/types/todo_types";
import axiosInstance from "./axios";

//TODOS
export const getTodosAPI = async (): Promise<Todo[]> => {
  const response = await axiosInstance.get("/api/todo");

  const todos: Todo[] = response.data.todos.map((todo: Todo) => {
    return {
      ...todo,
      due_date: todo.due_date ? new Date(todo.due_date) : null,
    };
  });

  return Promise.resolve(todos);
};

export const createTodoAPI = async (
  title: string,
  description: string,
  due_date: Date
) => {
  return await axiosInstance.post("/api/todo", {
    title,
    description,
    due_date,
  });
};

export const deleteTodoAPI = async (id: number) => {
  return axiosInstance.delete(`/api/todo?id=${id}`);
};

export const updateTodoAPI = async (
  id: number,
  title: string | undefined,
  description: string | undefined,
  completed: boolean | undefined
) => {
  return axiosInstance.put(`/api/todo?id=${id}`, {
    title,
    description,
    completed,
  });
};
