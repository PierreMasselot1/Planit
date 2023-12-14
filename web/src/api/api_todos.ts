import { Todo } from "@shared/types/todo_types";
import axiosInstance from "./axios";
import { Label } from "@shared/types/label_types";

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

export const createTodoAPI = async (todo: Partial<Todo>) => {
  return await axiosInstance.post("/api/todo", {
    todo,
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

//LABELS for TODOS

export const getTodoLabelsAPI = async (todo_id: number): Promise<Label[]> => {
  const labels = (
    await axiosInstance.get(`/api/todo/labels?todo_id=${todo_id}`)
  ).data.labels;
  return labels;
};
