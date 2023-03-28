import { SyntheticEvent, useEffect, useState } from "react";
import { Todo } from "@shared/types/todo_types";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../../helpers/api";
import { AxiosResponse } from "axios";
import { TodoList } from "@shared/types/todo_types";
import Button from "../../components/Common/Button";
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

  async function onToggle(
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    console.log(event.target);
    api
      .updateTodo(
        await getAccessTokenSilently(),
        id,
        undefined,
        undefined,
        !event.target.checked
      )
      .then(() => {
        getAllTodos();
      });
  }

  return (
    <div className="flex-auto">
      <div className="mt-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row align-baseline  mb-4 flex-wrap">
            <input
              type="text"
              className="mr-2 my-1 h-full border rounded py-1 px-2 leading-tight focus:outline-none focus:border-teal-500"
              placeholder="Title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              type="text"
              className="mr-2 my-1 h-full border rounded py-1 px-2 leading-tight focus:outline-none focus:border-teal-500"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button handleSubmit className="my-1 px-2 py-0">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {todos &&
        todos
          ?.sort((a: Todo, b: Todo) => a.id - b.id)
          .map((todo: any, key: number) => (
            <li className="list-none" key={key}>
              {
                <div className="bg-slate-300 sm:w-1/2 my-1 py-1 px-2 rounded flex ">
                  <input
                    id="default-checkbox"
                    className="mt-1 mb-auto"
                    type="checkbox"
                    checked={todo.completed != null ? todo.completed : false}
                    onChange={(e) => onToggle(e, todo.id)}
                  />
                  <div>
                    <label className="mx-2">{todo.title}</label>
                    <label className="mx-2">{todo.description}</label>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-auto my-auto text-xs h-6 bg-slate-700 hover:bg-slate-800 text-white font-bold py-1 px-2 rounded-full"
                  >
                    X
                  </button>
                </div>
              }
            </li>
          ))}
    </div>
  );
}
