import { request } from './axios.configs';

export const signInApi = (data) => {
  return request.post('/QuanLyNguoiDung/DangNhap', data);
};

export const signUpApi = (data) => {
  return request.post('/QuanLyNguoiDung/DangKy', data);
};

export const UpdateUserInfoApi = (data) => {
  return request({
    url: 'QuanLyNguoiDung/CapNhatThongTinNguoiDung',
    method: 'PUT',
    data,
  });
};

export const getUserInfoApi = () => {
  return request({
    url: `QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: 'POST',
  });
};
