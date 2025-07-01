import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();
const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => cookies.get("token") || null);

  const login = (newToken) => {
    cookies.set("token", newToken, { path: "/" });
    setToken(newToken);
  };

  const logout = () => {
    cookies.remove("token", { path: "/" });
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
