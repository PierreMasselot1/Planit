import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Todo } from "@shared/types/todo_types";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../../helpers/api";
import { AxiosResponse } from "axios";
import { TodoList } from "@shared/types/todo_types";
import Button from "../../components/Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import useAutosizeTextArea from "../../components/Common/useAutosizeTextArea";

export default function TodoListComponent() {
  const api = new Api(useAuth0());

  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  const editDescriptionAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(editDescriptionAreaRef.current, editDescription);

  const editTitleAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(editTitleAreaRef.current, editTitle);

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
      api.createTodo(title, description).then(async () => {
        getAllTodos();
      });
    } catch (err) {
      console.log("error" + err);
    }
  }

  async function getAllTodos() {
    api.getTodos().then((data: AxiosResponse<TodoList, TodoList>) => {
      setTodos((data as any).todos);
    });
  }

  async function deleteTodo(id: number) {
    api.deleteTodo(id).then(() => {
      getAllTodos();
    });
  }

  async function onToggle(
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    api.updateTodo(id, undefined, undefined, event.target.checked).then(() => {
      getAllTodos();
    });
  }

  return (
    <div className="flex flex-col justify-start text-left h-full">
      <div className="mt-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row align-baseline mb-4 flex-wrap">
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
      <div className="overflow-y-auto overflow-x-hidden scrollbar flex flex-1 flex-col w-1/2 min-w-fit">
        {todos &&
          todos
            ?.sort((a: Todo, b: Todo) => a.id - b.id)
            .map((todo: any, key: number) => (
              <li className="list-none" key={key}>
                {
                  <div className="bg-slate-300 my-1 py-1 px-2 rounded flex mr-2">
                    <input
                      id="default-checkbox"
                      className="mt-1 mb-auto"
                      type="checkbox"
                      checked={todo.completed != null ? todo.completed : false}
                      onChange={(e) => onToggle(e, todo.id)}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row">
                        {editId === todo.id ? (
                          <textarea
                            className="mx-2 border rounded leading-tight focus:outline-none focus:border-teal-500 resize-none w-full"
                            placeholder="Description to edit"
                            id="editTitle"
                            value={editTitle}
                            ref={editTitleAreaRef}
                            rows={1}
                            onChange={(event) =>
                              setEditTitle(event.target.value)
                            }
                          />
                        ) : (
                          <label className="mx-2 break-all break-words sm:text-lg">
                            {todo.title}
                          </label>
                        )}

                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() => {
                            setEditId(todo.id);
                            setEditTitle(todo.title);
                            setEditDescription(todo.description);
                          }}
                          className="ml-auto m-2 cursor-pointer"
                        />
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          onClick={() => deleteTodo(todo.id)}
                          className="m-2 cursor-pointer"
                        />
                      </div>

                      {editId === todo.id ? (
                        <textarea
                          className="mx-2 border rounded leading-tight focus:outline-none focus:border-teal-500 resize-none w-full"
                          placeholder="Description to edit"
                          id="editDescription"
                          value={editDescription}
                          ref={editDescriptionAreaRef}
                          rows={1}
                          onChange={(event) =>
                            setEditDescription(event.target.value)
                          }
                        />
                      ) : (
                        <label className="mx-2 break-all text-gray-800 ">
                          {todo.description}
                        </label>
                      )}
                    </div>
                  </div>
                }
              </li>
            ))}
      </div>
    </div>
  );
}
