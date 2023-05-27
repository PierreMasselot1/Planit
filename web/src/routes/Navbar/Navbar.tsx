import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/Auth/Login";
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
export default function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-row sm:flex-col justify-between my-1 sm:my-2 sm:ml-2 sm:py-1 sm:bg-gray-700 rounded-lg sm:w-60 overflow-auto">
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
      {NavIcon(
        "dailies",
        <FontAwesomeIcon icon={faCalendarDay} />,
        "Dailies",
        !isAuthenticated
      )}
      <div className="sm:mt-auto">
        {NavIcon(
          "profile",
          <FontAwesomeIcon icon={faUser} />,
          "Profile",
          !isAuthenticated
        )}
      </div>
      <div className="my-auto">      <LoginButton />
</div>
    </div>
  );
}
