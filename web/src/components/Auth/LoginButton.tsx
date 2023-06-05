import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./userContext";

const LoginButton = () => {
  const {user, updateUser}  = useContext(UserContext);
  return (
    <div className="flex h-full">
      <button
        className={
          "w-full flex flex-row text-white font-medium rounded-lg text-lg px-4 sm:px-5 py-1 sm:py-2.5 text-center sm:mx-2 my-1 hover:outline hover:outline-2"
        }
        onClick={
          user ? () => console.log("logout") : () => console.log("login")
        }
      >
        <div className=" flex flex-row">
          <FontAwesomeIcon
            icon={user ? faSignOut : faSignIn}
            className="my-auto"
          />
          <div className="hidden sm:block ml-2">
            {" "}
            {user ? "Log out" : "Log in"}{" "}
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoginButton;
