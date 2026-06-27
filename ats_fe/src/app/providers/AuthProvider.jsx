import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Logic for authentication (e.g., login, logout, check auth status)
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount

    function checkAuthStatus() {
      const userData = localStorage.getItem("user");

      // Reset to context
      if (userData) {
        setUser(JSON.parse(userData)); // Set user state from localStorage
      }
    }

    checkAuthStatus();
  }, []);

  const login = (userProfile) => {
    setUser(userProfile);
    localStorage.setItem("user", JSON.stringify(userProfile)); // Store user data in localStorage
  };

  const dataContext = { user };
  const actionContext = { login };
  return (
    <AuthContext.Provider value={{ ...dataContext, ...actionContext }}>
      {children}
    </AuthContext.Provider>
  );
};
