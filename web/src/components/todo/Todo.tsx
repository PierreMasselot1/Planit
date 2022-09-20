import React from "react";

export default function Todo() {

    function onToggle() {
        console.log("toggled")
    }
    function onDestroy(){
        console.log("destroy")
    }
  return (
    <div>
      <div>Todo</div>
      <div className="bg-green-400 w-fit mx-2 my-1 p-1 rounded "><input type="checkbox" onChange={onToggle}/>
      <label className="mx-2">TODO</label>
      <button onClick={onDestroy} className="bg-slate-50 rounded-full ">X</button></div>
      
    </div>
  );
}
