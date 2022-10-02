import { useEffect, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("useEffect todo");
    try {
      fetch("http://localhost:5055/api/todo", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`Here is the data received:${data}`);
          console.log(data);
          setTodos(data.todos);
        });
    } catch (err) {
      console.log("error" + err);
    }
  }, []);

  return (
    <div>
      {todos.map((todo: any, key: number) => (
        <li className="list-none" key={key}>
          {TodoItem(todo.title, todo.description)}
        </li>
      ))}
    </div>
  );
}
