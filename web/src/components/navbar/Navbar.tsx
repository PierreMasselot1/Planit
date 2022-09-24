import React from "react";
import { Link } from "react-router-dom";
import PomodoroNavIcon from "../pomodoro/PomodoroNavIcon";

export default function Navbar() {
  return (
    <div className="flex flex-col mx-3">
      <Link to={"/"}>Navbar</Link>
      <Link to={"pomodoro"}>
        <PomodoroNavIcon />
      </Link>
      <Link to={"todo"} className="whitespace-nowrap">
        <div className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">Todo</div>
      </Link>
    </div>
  );
}
