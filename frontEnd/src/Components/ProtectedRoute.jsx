import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../Context/GlobalContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useGlobalContext();
  return (user? <Outlet /> : <Navigate to='/login'/>)
};

export default ProtectedRoute;