import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../../helpers/api";
import { User } from "@shared/types/user_types";
function Profile() {
  const { user } = useAuth0();
  const [userPassport, setUser] = React.useState<User | null>(null);
  const api = new Api(useAuth0());
  useEffect(() => {
    getUserInfoPassport();
    return;
  }, []);

  async function getUserInfoPassport() {
    const userTemp = await api.getUser();
    console.log(userTemp)
    setUser(userTemp);
  }
  return (
    <div className="text-white">
      <div className="text-white text-2xl font-bold">Profile:</div>
      PASSPORT PROFILE
      <div className="flex items-center">
        {userPassport?.email}
        {userPassport?.username}
        {userPassport?.password}
      </div>
      AUTH0:
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
