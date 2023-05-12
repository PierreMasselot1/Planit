export type Todo = {
  id: number;
  todo_list_id: number;
  title: string;
  description: string;
};

export type TodoList = {
  todos: Todo[];
};
