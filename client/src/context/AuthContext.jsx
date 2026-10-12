import { createContext, useContext, useState } from "react";
import { loginWithGoogle } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (googleCredential) => {
    const loggedUser = await loginWithGoogle(googleCredential);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);