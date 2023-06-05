import axiosInstance from "./axios";

//TODOS
export const getTodosAPI = async () => {
  return (await axiosInstance.get("/api/todo")).data;
};

export const createTodoAPI = async (title: string, description: string) => {
  return await axiosInstance.post("/api/todo", {
    title,
    description,
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
