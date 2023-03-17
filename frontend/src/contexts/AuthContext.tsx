import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../api/client";
import { LoginUser, RegisterUser } from "../schemas/userSchemas";
import { User } from "../types/user";

import { login as authLogin } from "../api/authentication";
import sleep from "../utils/sleep";
import { getFromLocalStorage } from "../utils/getFromLocalstorage";

export type AuthContext = {
  login: (data: LoginUser) => Promise<void> | void;
  logout: () => void;
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContext>({
  login: (data) => {},
  logout: () => {},
  user: null,
  isLoading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const LOCAL_STORAGE_KEYS = {
    TOKEN: "realtime-token",
    USER: "user",
  };

  const [token, setToken] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
  );
  const [user, setUser] = useState<User | null>(
    getFromLocalStorage<User>(LOCAL_STORAGE_KEYS.USER)
  );
  const [isLoading, setIsLoading] = useState(false);

  async function login(data: LoginUser) {
    const { token, user } = await authLogin(data);
    setToken(token);
    setUser(user);

    sleep(500); // wait until sets are done
  }

  function logout() {
    setUser(null);
    setIsLoading(false);
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    }

    client.defaults.headers["authorization"] = `Bearer ${token}`;
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
