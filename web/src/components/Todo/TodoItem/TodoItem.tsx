import React from "react";

export default function TodoItem(todo: any, reloadTodos:any) {
  function onToggle() {
    console.log("toggled");
    console.log(todo.is_deleted);
  }
  function onDestroy() {
    console.log("destroy");

    try {
      fetch(
        `http://localhost:5055/api/todo?id=${todo.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ).then((response) => response.json());
    } catch (err) {
      console.log("error" + err);
    }
    reloadTodos()
  }

  return (
    <div className="bg-green-400 w-fit my-1 py-1 px-2 rounded ">
      <input type="checkbox" onChange={onToggle} />
      <label className="mx-2">TODO</label>
      <label className="mx-2">{todo.title}</label>
      <label className="mx-2">{todo.description}</label>

      <button onClick={onDestroy} className="bg-slate-50 rounded-full ">
        X
      </button>
    </div>
  );
}
