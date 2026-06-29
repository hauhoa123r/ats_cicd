import { createContext, useEffect, useState } from "react";
import authService from "@/features/auth/services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until session check completes

  useEffect(() => {
    // The accessToken is an httpOnly cookie (not readable by JS).
    // Ask the backend who we are; if the cookie is valid we restore the session.
    let active = true;

    (async () => {
      try {
        const { data } = await authService.me();
        if (active) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch {
        if (active) {
          setUser(null);
          localStorage.removeItem("user");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const login = (userProfile) => {
    setUser(userProfile);
    localStorage.setItem("user", JSON.stringify(userProfile));
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
