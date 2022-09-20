import React from "react";
import { Link } from "react-router-dom";
import PomodoroNavIcon from "../pomodoro/PomodoroNavIcon";

export default function Navbar() {
  return (
    <div className="flex flex-col">
      <Link to={"/"}>Navbar</Link>
      <Link to={"pomodoro"}>
        <PomodoroNavIcon />
      </Link>
      <Link to={"pomodoro"} className="whitespace-nowrap">
        Pomodoro Nav Icon
      </Link>
    </div>
  );
}
