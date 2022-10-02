import React from "react";
import { Link } from "react-router-dom";
import NavIcon from "./NavIcon";

export default function Navbar() {
  return (
    <div className="flex flex-col mx-3">
      <Link to={"/"}>{NavIcon("Home")}</Link>
      <Link to={"pomodoro"}>{NavIcon("Pomodoro")}</Link>
      <Link to={"todo"} className="whitespace-nowrap">
        {NavIcon("Todo")}
      </Link>
    </div>
  );
}
