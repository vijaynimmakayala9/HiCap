import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestHeader from './GuestHeader';
import UserLayout from './UserLayout'; // Replace UserHeader with UserLayout

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return isLoggedIn ? (
    <UserLayout user={user} onLogout={handleLogout} />
  ) : (
    <GuestHeader onLogin={handleLogin} />
  );
};

export default Header;
