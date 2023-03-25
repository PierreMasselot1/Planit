import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <div className="flex">
      <button
        className={
          "w-full flex flex-row text-white font-medium rounded-lg text-lg px-4 sm:px-5 py-1 sm:py-2.5 text-center sm:mx-2 my-1 hover:outline hover:outline-2"
        }
        onClick={
          isAuthenticated
            ? () => logout({ returnTo: window.location.origin })
            : () => loginWithRedirect()
        }
      >
        <div className=" flex flex-row">
          <FontAwesomeIcon
            icon={isAuthenticated ? faSignOut : faSignIn}
            className="my-auto"
          />
          <div className="hidden sm:block ml-2">
            {" "}
            {isAuthenticated ? "Log out" : "Log in"}{" "}
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoginButton;
