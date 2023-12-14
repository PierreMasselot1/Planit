import { Label } from "./label_types";

export type Todo = {
  id: number;
  todo_list_id: number;
  title: string;
  description?: string;
  labels?: Label[];
  due_date?: Date;
  completed: boolean;
  is_deleted: boolean;
};

export type TodoList = {
  todos: Todo[];
};
