import { SyntheticEvent, useEffect, useState } from "react";
import { Todo } from "@shared/types/todo_types";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../../helpers/api";
import { AxiosResponse } from "axios";
import { TodoList } from "@shared/types/todo_types";
export default function TodoListComponent() {
  const { getAccessTokenSilently } = useAuth0();
  const api = new Api();

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
      api
        .createTodo(await getAccessTokenSilently(), title, description)
        .then(async () => {
          getAllTodos();
        });
    } catch (err) {
      console.log("error" + err);
    }
  }

  async function getAllTodos() {
    api
      .getTodos(await getAccessTokenSilently())
      .then((data: AxiosResponse<TodoList, TodoList>) => {
        setTodos((data as any).todos);
      });
  }

  async function deleteTodo(id: number) {
    api.deleteTodo(await getAccessTokenSilently(), id).then(() => {
      getAllTodos();
    });
  }

  function onToggle(event: SyntheticEvent) {
    console.log(event.target);
  }

  return (
    <div className="flex-auto">
      {todos &&
        todos.map((todo: any, key: number) => (
          <li className="list-none" key={key}>
            {
              <div className="bg-slate-300 w-fit my-1 py-1 px-2 rounded ">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={onToggle}
                />
                <label className="mx-2">{todo.title}</label>
                <label className="mx-2">{todo.description}</label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-xs bg-slate-700 hover:bg-slate-800 text-white font-bold py-1 px-2 rounded-full"
                >
                  X
                </button>
              </div>
            }
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
