import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "@shared/types/user_types";
import { getUserAPI } from "../../api/api_helpers";

type UserContextType = {
  user: User | null;
  updateUser: (newUser: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
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
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
