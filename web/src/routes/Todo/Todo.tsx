import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Todo } from "@shared/types/todo_types";
import { AxiosResponse } from "axios";
import { TodoList } from "@shared/types/todo_types";
import Button from "../../components/Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faFilePen,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useAutosizeTextArea from "../../components/Common/useAutosizeTextArea";
import {
  createTodoAPI,
  deleteTodoAPI,
  getTodosAPI,
  updateTodoAPI,
} from "../../api/api_todos";

export default function TodoListComponent() {
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [incompletedTodos, setIncompletedTodos] = useState<Array<Todo>>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const editDescriptionAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(editDescriptionAreaRef.current, editDescription);

  const editTitleAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(editTitleAreaRef.current, editTitle);

  useEffect(() => {
    if (editId !== null) {
      editTitleAreaRef.current?.focus();
    }
  }, [editId]);

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
      createTodoAPI(title, description).then(async () => {
        getAllTodos();
      });
    } catch (err) {
      console.log("error" + err);
    }
  }

  async function getAllTodos() {
    getTodosAPI().then((data: AxiosResponse<TodoList, TodoList>) => {
      const todos: Array<Todo> = (data as any).todos;
      setCompletedTodos(todos.filter((todo) => todo.completed));
      setIncompletedTodos(todos.filter((todo) => !todo.completed));
    });
  }

  async function deleteTodo(id: number) {
    deleteTodoAPI(id).then(() => {
      getAllTodos();
    });
  }

  async function updateTodo() {
    try {
      if (editId)
        updateTodoAPI(editId, editTitle, editDescription, undefined).then(
          () => {
            setEditId(null);
            getAllTodos();
          }
        );
      else {
        console.log("editId is null");
      }
    } catch (err) {
      console.log("error" + err);
    }
  }

  function todoList(todos: Array<Todo>) {
    return todos
      ?.sort((a: Todo, b: Todo) => a.id - b.id)
      .map((todo: Todo, key: number) => (
        <li className="list-none" key={key}>
          {
            <div
              className={`bg-slate-300 my-1 py-1 px-2 rounded flex mr-2 ${
                todo.completed && "line-through bg-opacity-70"
              }`}
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-row">
                  {editId === todo.id ? (
                    <textarea
                      className="mr-2 mt-1 border rounded leading-tight focus:outline-none focus:border-teal-500 resize-none w-full overflow-hidden"
                      placeholder="Description to edit"
                      id="editTitle"
                      value={editTitle}
                      ref={editTitleAreaRef}
                      rows={1}
                      onChange={(event) => setEditTitle(event.target.value)}
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
                    className="ml-auto m-2  hover:text-blue-500 cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faCheck}
                    onClick={() => {
                      updateTodoAPI(
                        todo.id,
                        undefined,
                        undefined,
                        !todo.completed
                      ).then(() => {
                        getAllTodos();
                      });
                    }}
                    className={`m-2   ${
                      todo.completed
                        ? "hover:text-gray-500 text-green-500"
                        : "hover:text-green-500"
                    } cursor-pointer `}
                  />

                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => deleteTodo(todo.id)}
                    className="m-2 cursor-pointer hover:text-red-500"
                  />
                </div>

                {editId === todo.id ? (
                  <div className="flex flex-col">
                    <textarea
                      className="mb-1 border rounded leading-tight focus:outline-none focus:border-teal-500 resize-none w-full overflow-hidden"
                      placeholder="Description to edit"
                      id="editDescription"
                      value={editDescription}
                      ref={editDescriptionAreaRef}
                      rows={1}
                      onChange={(event) =>
                        setEditDescription(event.target.value)
                      }
                    />
                    <div className="flex">
                      <Button
                        className="ml-auto mr-2 text-red-500 hover:text-red-700"
                        onClick={() => setEditId(null)}
                      >
                        <div className="flex">
                          <div className="text-white">Cancel</div>
                          <FontAwesomeIcon
                            className="ml-2 my-auto"
                            icon={faXmark}
                          />
                        </div>
                      </Button>
                      <Button
                        onClick={updateTodo}
                        className="text-green-500 hover:text-green-700"
                      >
                        <div className="flex align-middle">
                          <div className="text-white">Update</div>
                          <FontAwesomeIcon
                            className="ml-2 my-auto"
                            icon={faFilePen}
                          />
                        </div>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="mx-2 break-all text-gray-800 ">
                    {todo.description}
                  </label>
                )}
              </div>
            </div>
          }
        </li>
      ));
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
      <div
        className={`overflow-y-auto overflow-x-hidden scrollbar flex flex-1 flex-col min-w-fit  `}
      >
        {todoList(incompletedTodos)}
        <div className="mt-auto"></div>
        <div>
          <button
            className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded"
            onClick={toggleList}
          >
            <span>Completed Todos</span>
            <FontAwesomeIcon
              className={` ml-2 w-4 h-4 transition-transform transform hover:text-teal-300 ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
              icon={faChevronDown}
            />
          </button>
          {isOpen && todoList(completedTodos)}
        </div>
      </div>
    </div>
  );
}
