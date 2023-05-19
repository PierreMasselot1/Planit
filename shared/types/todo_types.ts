export type Todo = {
  id: number;
  todo_list_id: number;
  title: string;
  description: string;
  completed: boolean;
};

export type TodoList = {
  todos: Todo[];
};
