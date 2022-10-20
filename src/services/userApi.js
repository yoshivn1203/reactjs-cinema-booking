import { request } from './axios.configs';

export const signInApi = (data) => {
  return request.post('/QuanLyNguoiDung/DangNhap', data);
};

export const signUpApi = (data) => {
  return request.post('/QuanLyNguoiDung/DangKy', data);
};

export const getUserInfoApi = () => {
  return request.post('/QuanLyNguoiDung/ThongTinTaiKhoan');
};

export const UpdateUserInfoApi = (data) => {
  return request.put('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
};
