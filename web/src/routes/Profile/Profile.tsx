import React from "react";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
function Profile() {
  const { user }: Auth0ContextInterface = useAuth0();
  return (
    <div className="text-white">
      <div className="text-white text-2xl font-bold">Profile:</div>

      <div className="flex items-center">
        <img
          src={user?.picture}
          alt={`${user?.name}`}
          className="ml-4 w-10 h-10 rounded-full"
        />
        <span className="hidden sm:block ml-4 font-bold text-lg truncate">
          {user?.name}
        </span>
      </div>
      <span className="hidden sm:block ml-4 font-bold text-lg truncate">
        {user?.email}
      </span>
      <span className="hidden sm:block ml-4 font-bold text-lg truncate">
        {user?.phone_number}
      </span>
    </div>
  );
}

export default Profile;
