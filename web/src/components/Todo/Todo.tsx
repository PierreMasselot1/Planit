import { useEffect, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

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

  useEffect(() => {
    const keyDownHandler = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.key === "Enter") {
        event.preventDefault();
        try {
          fetch(
            `http://localhost:5055/api/todo?title=test title&description=${todoInput}`,
            {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                title: "test title",
                description: todoInput,
              }),
            }
          ).then((response) => response.json());
        } catch (err) {
          console.log("error" + err);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [todoInput]);

  return (
    <div className="flex-auto bg-gray-700 rounded-lg mr-2 my-3 p-2">
      {todos.map((todo: any, key: number) => (
        <li className="list-none" key={key}>
          {TodoItem(todo.title, todo.description)}
        </li>
      ))}
      <form>
        <input
          type="text"
          placeholder="Enter Todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </form>
    </div>
  );
}
