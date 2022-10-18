import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const NoUserProtected = () => {
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) {
    return <Navigate to='/sign-in' />;
  }
  return <Outlet />;
};

export default NoUserProtected;
