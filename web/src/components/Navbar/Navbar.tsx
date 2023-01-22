import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UserProfile from "../Auth/AuthInfo";
import LoginButton from "../Auth/Login";
import NavIcon from "./NavIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faCheck,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="flex flex-col justify-between my-3 sm:ml-3 sm:py-1 sm:bg-gray-700 rounded-lg sm:w-60">
      <Link to={"/"}>
        <img
          src={require("../../images/Logo.png")}
          className="sm:hidden my-1 w-16"
          alt="Planit"
        />
        <img
          src={require("../../images/Planit-logo-large.png")}
          className="hidden sm:block m-1 w-fit"
          alt="Planit"
        />
      </Link>
      <Link to={"pomodoro"}>
        {NavIcon(
          <FontAwesomeIcon icon={faStopwatch} />,
          "Pomodoro",
          !isAuthenticated
        )}
      </Link>
      <Link to={"todo"} className=" whitespace-nowrap">
        {NavIcon(<FontAwesomeIcon icon={faCheck} />, "Todo", !isAuthenticated)}
      </Link>
      <Link to={"habit"}>
        {NavIcon(
          <FontAwesomeIcon icon={faRepeat} />,
          "Habit",
          !isAuthenticated
        )}
      </Link>

      <div className="mt-auto">
        {!isLoading && isAuthenticated && (
          <div className="sm:text-white sm:outline outline-gray-800 outline- font-medium rounded-lg text-lg sm:px-3 py-1.5 text-center sm:mx-3 sm:my-2">
            <UserProfile />
          </div>
        )}

        <LoginButton />
      </div>
    </div>
  );
}