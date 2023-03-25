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
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="flex flex-row sm:flex-col justify-between my-1 sm:my-2 sm:ml-2 sm:py-1 sm:bg-gray-700 rounded-lg sm:w-60">
      {NavIcon("", <FontAwesomeIcon icon={faHouse} />, "Home")}
      {NavIcon("pomodoro", <FontAwesomeIcon icon={faStopwatch} />, "Pomodoro")}
      {NavIcon(
        "todo",
        <FontAwesomeIcon icon={faCheck} />,
        "Todo",
        !isAuthenticated
      )}
      {NavIcon(
        "habit",
        <FontAwesomeIcon icon={faRepeat} />,
        "Habit",
        !isAuthenticated
      )}

      <div className="sm:mt-auto">
        {NavIcon(
          "profile",
          <FontAwesomeIcon icon={faUser} />,
          "Profile",
          !isAuthenticated
        )}

        <LoginButton />
      </div>
    </div>
  );
}
