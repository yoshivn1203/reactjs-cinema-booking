import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NoUserProtected = () => {
  const { userInfo } = useSelector((state) => state.user);
  const customId = 'notUser'; // add id to prevent duplicate toast
  if (!userInfo) {
    toast('Xin vui lòng đăng nhập để tiếp tục', { toastId: customId });
    return <Navigate to='/sign-in' />;
  }
  return <Outlet />;
};

export default NoUserProtected;
