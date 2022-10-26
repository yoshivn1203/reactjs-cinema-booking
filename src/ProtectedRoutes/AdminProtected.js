import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminProtected = () => {
  const { userInfo } = useSelector((state) => state.user);
  const customId = 'notAdmin'; // add id to prevent duplicate toast
  if (!userInfo || userInfo.maLoaiNguoiDung !== 'QuanTri') {
    toast.error(
      'Bạn không có quyền truy cập trang này, xin vui lòng đăng nhập bằng tài khoản admin',
      { toastId: customId }
    );
    return <Navigate to='/sign-in' />;
  }
  return <Outlet />;
};

export default AdminProtected;
