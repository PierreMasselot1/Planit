import LoginButton from "../../components/Auth/LoginButton";
import NavIcon from "./NavIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faCheck,
  faRepeat,
  faHouse,
  faUser,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../components/Auth/userContext";
export default function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-row sm:flex-col justify-between my-1 sm:my-2 sm:ml-2 sm:py-1 sm:bg-neutral-700 rounded-lg sm:w-60 overflow-auto">
      {NavIcon("", <FontAwesomeIcon icon={faHouse} />, "Home")}
      {NavIcon("pomodoro", <FontAwesomeIcon icon={faStopwatch} />, "Pomodoro")}
      {NavIcon("todo", <FontAwesomeIcon icon={faCheck} />, "Todo", !user)}
      {NavIcon("habit", <FontAwesomeIcon icon={faRepeat} />, "Habit", !user)}
      {NavIcon(
        "dailies",
        <FontAwesomeIcon icon={faCalendarDay} />,
        "Dailies",
        !user
      )}
      <div className="sm:mt-auto">
        {NavIcon(
          "profile",
          <FontAwesomeIcon icon={faUser} />,
          "Profile",
          !user
        )}
      </div>
      <div>
        <LoginButton />
      </div>
    </div>
  );
}
