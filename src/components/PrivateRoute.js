// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
