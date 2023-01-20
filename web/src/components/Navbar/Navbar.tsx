import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UserProfile from "../Auth/AuthInfo";
import LoginButton from "../Auth/Login";
import NavIcon from "./NavIcon";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="flex flex-col justify-between m-3 py-1 bg-gray-700 rounded-lg">
      <Link to={"/"}>{NavIcon("Home", !isAuthenticated)}</Link>
      <Link to={"pomodoro"}>{NavIcon("Pomodoro", !isAuthenticated)}</Link>
      <Link to={"todo"} className=" whitespace-nowrap">
        {NavIcon("Todo", !isAuthenticated)}
      </Link>
      <Link to={"habit"}>{NavIcon("Habit", !isAuthenticated)}</Link>

      <div className="mt-auto">
        {!isLoading && isAuthenticated && (
          <div className="text-white outline outline-gray-800 outline- font-medium rounded-lg text-lg px-3 py-1.5 text-center mx-3 my-2">
            <UserProfile />
          </div>
        )}

        <LoginButton />
      </div>
    </div>
  );
}
