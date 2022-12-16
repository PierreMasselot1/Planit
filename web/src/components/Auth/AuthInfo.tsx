import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user } = useAuth0();

  return (
    <div className="flex items-center">
      <img
        src={user?.picture}
        alt={`${user?.name}`}
        className="w-10 h-10 rounded-full"
      />
      <span className="ml-4 font-bold text-lg">{user?.name}</span>
    </div>
  );
};

export default UserProfile;
