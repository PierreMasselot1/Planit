import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "@shared/types/user_types";
import { getUserAPI } from "../../api/api_user";

type UserContextType = {
  user: User | null;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  refreshUser: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUserInfoPassport();
    return;
  }, []);

  async function getUserInfoPassport() {
    const userTemp = await getUserAPI();
    setUser(userTemp);
  }

  return (
    <UserContext.Provider value={{ user, refreshUser: getUserInfoPassport }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
