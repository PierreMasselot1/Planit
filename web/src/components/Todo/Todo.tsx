import { useEffect, useState } from "react";
import { Todo } from "@shared/types/todo_types";
import TodoItem from "./TodoItem/TodoItem";
import { useAuth0 } from "@auth0/auth0-react";

export default function TodoList() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    try {
      getAllTodos();
    } catch (err) {
      console.log("error" + err);
    }
  }, []);

  useEffect(() => {
    const keyDownHandler = async (event: {
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
              headers: {
                authorization: `Bearer ${await getAccessTokenSilently()}`,
              },
              body: JSON.stringify({
                title: "test title",
                description: todoInput,
              } as Todo),
            }
          ).then(async () => {
            getAllTodos();
          });
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

  async function getAllTodos() {
    fetch("http://localhost:5055/api/todo", {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.todos);
      });
  }

  async function deleteTodo(id: number) {
    try {
      fetch(`http://localhost:5055/api/todo?id=${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
      }).then((response) => {
        if (response.status === 204) {
          getAllTodos();
        }
      });
    } catch (err) {
      console.log("error" + err);
    }
  }

  return (
    <div className="flex-auto bg-gray-700 rounded-lg mr-2 my-3 p-2">
      { todos && todos.map((todo: any, key: number) => (
        <li className="list-none" key={key}>
          {TodoItem(todo, deleteTodo)}
        </li>
      )) 
      }
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
