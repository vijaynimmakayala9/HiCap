import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the LoginContext
const LoginContext = createContext();

// Creating a custom hook for accessing the login context
export const useLogin = () => {
  return useContext(LoginContext);
};

// Provider component to wrap the root of your application
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    const savedToken = localStorage.getItem('token');
    
    if (savedUserId && savedToken) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
      setToken(savedToken);
    }
  }, []);

  // Login function that sets the login state and saves data to localStorage
  const login = (userId, token) => {
    setUserId(userId);
    setToken(token);
    setIsLoggedIn(true);

    // Save to localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
  };

  // Logout function that clears the login state and localStorage
  const logout = () => {
    setUserId(null);
    setToken(null);
    setIsLoggedIn(false);

    // Remove from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, userId, token, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
