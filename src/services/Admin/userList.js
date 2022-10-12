import { request } from "../axios.configs";

export const fetchUserListApi = () => {
  return request({
    url: "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02",
    method: "GET",
  });
};

export const deleteUserApi = (taiKhoan) => {
  return request({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    method: "DELETE",
    TaiKhoan: taiKhoan,
  });
};

export const UpdateUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "POST",
    data,
  });
};

export const fetchSearchUserApi = (tuKhoa) => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02&tuKhoa=${tuKhoa}`,
    method: "GET",
  });
};

export const addUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data,
  });
};