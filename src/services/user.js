import { request } from "./axios.configs";

export const signInApi = (data) => {
  return request({
    url: "QuanLyNguoiDung/DangNhap",
    method: "POST",
    data,
  });
};
export const signUpApi = (data) => {
  return request({
    url: "QuanLyNguoiDung/DangKy",
    method: "POST",
    data,
  });
};
export const UpdateUserInfoApi = (data) => {
  return request({
    url: "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    method: "PUT",
    data,
  });
};

export const getUserInfoApi = () => {
  return request({
    url: `QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
  });
};
