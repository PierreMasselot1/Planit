import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../Auth/Login";
import LogoutButton from "../Auth/Logout";
import NavIcon from "./NavIcon";

export default function Navbar() {
  return (
    <div className="flex-auto flex-col m-3 py-1 bg-gray-700 rounded-lg">
      <Link to={"/"}>{NavIcon("Home")}</Link>
      <Link to={"pomodoro"}>{NavIcon("Pomodoro")}</Link>
      <Link to={"todo"} className="whitespace-nowrap">
        {NavIcon("Todo")}
      </Link>
      {NavIcon(<LoginButton />)}
      {NavIcon(<LogoutButton />)}
    </div>
  );
}
