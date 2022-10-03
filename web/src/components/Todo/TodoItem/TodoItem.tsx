import React from "react";

export default function TodoItem(title: string = "", description: string = "") {
  function onToggle() {
    console.log("toggled");
  }
  function onDestroy() {
    console.log("destroy");
  }

  return (
    <div className="bg-green-400 w-fit my-1 py-1 px-2 rounded ">
      <input type="checkbox" onChange={onToggle} />
      <label className="mx-2">TODO</label>
      <label className="mx-2">{title}</label>
      <label className="mx-2">{description}</label>

      <button onClick={onDestroy} className="bg-slate-50 rounded-full ">
        X
      </button>
    </div>
  );
}
