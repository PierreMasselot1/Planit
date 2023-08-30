import { Label } from "./label_types";

export type Todo = {
  id: number;
  todo_list_id: number;
  title: string;
  description: string;
  labels: Label[];
  completed: boolean;
};

export type TodoList = {
  todos: Todo[];
};
