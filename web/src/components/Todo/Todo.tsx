import { useEffect, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [reload, setReloadTodos] = useState(false);

  function reloadTodos() {
    setReloadTodos(!reload);
  }

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
  }, [reload]);

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
        reloadTodos();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [todoInput]);

  function getAllTodos(){
    
  }
  function deleteTodo(id:number){
    try {
      fetch(`http://localhost:5055/api/todo?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if(response.status===204){
            console.log("successfully deleted")
          }
        })
    } catch (err) {
      console.log("error" + err);
    }
  }

  return (
    <div className="flex-auto bg-gray-700 rounded-lg mr-2 my-3 p-2">
      {todos.map((todo: any, key: number) => (
        <li className="list-none" key={key}>
          {TodoItem(todo,deleteTodo)}
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
