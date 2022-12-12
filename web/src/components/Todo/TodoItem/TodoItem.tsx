export default function TodoItem(todo: any, deleteTodo: Function) {
  function onToggle() {
    console.log("toggled");
  }
  function onDestroy() {
    deleteTodo(todo.id);
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
