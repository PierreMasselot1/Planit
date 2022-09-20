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
        <div className="whitespace-nowrap text-xl text-green-400">Todo</div>
      </Link>
    </div>
  );
}
