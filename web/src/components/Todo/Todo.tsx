import { SyntheticEvent, useEffect, useState } from "react";
import { Todo } from "@shared/types/todo_types";
import TodoItem from "./TodoItem/TodoItem";
import { useAuth0 } from "@auth0/auth0-react";

export default function TodoList() {
  const { getAccessTokenSilently } = useAuth0();

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createTodo(title, description);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    try {
      getAllTodos();
    } catch (err) {
      console.log("error" + err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createTodo(title: string, description: string) {
    try {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todo?title=${title}&description=${description}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
          } as Todo),
        }
      ).then(async () => {
        getAllTodos();
      });
    } catch (err) {
      console.log("error" + err);
    }
  }

  async function getAllTodos() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/todo`, {
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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/todo?id=${id}`, {
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
    <div className="flex-auto bg-gray-700 rounded-lg mx-1 sm:mx-3 my-3 p-2">
      {todos &&
        todos.map((todo: any, key: number) => (
          <li className="list-none" key={key}>
            {TodoItem(todo, deleteTodo)}
          </li>
        ))}

      <div className="mt-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label className="text-white  text-sm font-bold mb-1">Title</label>
            <input
              type="text"
              className="border rounded py-1 px-2 leading-tight focus:outline-none focus:border-teal-500"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white  text-sm font-bold mb-1">
              Description
            </label>
            <input
              type="text"
              className="border rounded py-1 px-2 leading-tight focus:outline-none focus:border-teal-500"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
