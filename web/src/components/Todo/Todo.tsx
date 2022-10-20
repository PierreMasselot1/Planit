import { Todo } from "@shared/types/todo_types";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const todo: Todo = { title: "test", description: "ahahjd" };
  console.log(todo);
  useEffect(() => {
    console.log("useEffect todo");
    try {
      fetch("http://localhost:5055/api/todo", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(data.todos);
        });
    } catch (err) {
      console.log("error" + err);
    }
  }, []);

  return (
    <div className="flex-auto bg-gray-700 rounded-lg mr-2 my-3 p-2">
      {todos.map((todo: any, key: number) => (
        <li className="list-none" key={key}>
          {TodoItem(todo.title, todo.description)}
        </li>
      ))}
    </div>
  );
}
