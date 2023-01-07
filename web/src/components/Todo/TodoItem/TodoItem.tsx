import { Todo } from "@shared/types/todo_types";

export default function TodoItem(todo: Todo, deleteTodo: Function) {
  function onToggle() {}
  function onDestroy() {
    deleteTodo(todo.id);
  }

  return (
    <div className="bg-green-400 w-fit my-1 py-1 px-2 rounded ">
      <input id="default-checkbox" type="checkbox" onChange={onToggle} />
      <label className="mx-2">{todo.title}</label>
      <label className="mx-2">{todo.description}</label>
      <button
        onClick={onDestroy}
        className="text-xs bg-slate-700 hover:bg-slate-800 text-white font-bold py-1 px-2 rounded-full"
      >
        X
      </button>
    </div>
  );
}
