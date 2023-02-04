import React from 'react';
import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState(localStorage.getItem('user'))
  return (user? <Outlet /> : <Navigate to='/login'/>)
};

export default ProtectedRoute;