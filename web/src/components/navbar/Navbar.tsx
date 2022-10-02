import React from "react";
import { Link } from "react-router-dom";
import NavIcon from "./NavIcon";

export default function Navbar() {
  return (
    <div className="flex flex-col m-3 py-1 bg-gray-700 h-96  rounded-lg">
      <Link to={"/"}>{NavIcon("Home")}</Link>
      <Link to={"pomodoro"}>{NavIcon("Pomodoro")}</Link>
      <Link to={"todo"} className="whitespace-nowrap">
        {NavIcon("Todo")}
      </Link>
    </div>
  );
}
