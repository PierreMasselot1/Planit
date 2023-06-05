import React, { useEffect } from "react";
import { User } from "@shared/types/user_types";
import { getUserAPI } from "../../api/api_user";
function Profile() {
  const [userPassport, setUser] = React.useState<User | null>(null);
  useEffect(() => {
    getUserInfoPassport();
    return;
  }, []);

  async function getUserInfoPassport() {
    const userTemp = await getUserAPI();
    console.log(userTemp);
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
    </div>
  );
}

export default Profile;
