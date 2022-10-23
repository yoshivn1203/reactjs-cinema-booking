import { MOVIE_GROUP_ID } from '../../utils/common';
import { request } from '../axios.configs';

export const fetchUserListApi = (page, rowsPerPage) => {
  return request.get(
    `/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${MOVIE_GROUP_ID}&soTrang=${
      page + 1
    }&soPhanTuTrenTrang=${rowsPerPage}`
  );
};

export const fetchSearchUserApi = (page, rowsPerPage, searchValue) => {
  return request.get(
    `/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${MOVIE_GROUP_ID}&tuKhoa=${searchValue.trim()}&soTrang=${
      page + 1
    }&soPhanTuTrenTrang=${rowsPerPage}`
  );
};

export const deleteUserApi = (taiKhoan) => {
  return request.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
};

export const addUserApi = (data) => {
  return request.post(`/QuanLyNguoiDung/ThemNguoiDung`, data);
};

export const updateUserApi = (data) => {
  return request.post(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data);
};
