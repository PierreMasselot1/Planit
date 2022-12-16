import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "../Auth/Login";
import NavIcon from "./NavIcon";

export default function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex-auto flex-col m-3 py-1 bg-gray-700 rounded-lg">
      <Link to={"/"}>{NavIcon("Home", !isAuthenticated)}</Link>
      <Link to={"pomodoro"}>{NavIcon("Pomodoro", !isAuthenticated)}</Link>
      <Link to={"todo"} className=" whitespace-nowrap">
        {NavIcon("Todo", !isAuthenticated)}
      </Link>
      <div className="flex-auto m-auto"> {NavIcon(<LoginButton />)}</div>
    </div>
  );
}
