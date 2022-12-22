import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { isAuthenticated} = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <div className="flex">
      {isAuthenticated ? (
        <button
          className={`w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600  font-medium rounded-lg text-lg px-5 py-2.5 text-center mx-2 my-1
       "hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800"
     `}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      ) : (
        <button
          className={`w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600  font-medium rounded-lg text-lg px-5 py-2.5 text-center mx-2 my-1
        "hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 "
     } `}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default LoginButton;
