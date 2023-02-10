export type Todo = {
  id: number
  title: string;
  description: string;
};

export type TodoList = {
  todos: Todo[];
}
