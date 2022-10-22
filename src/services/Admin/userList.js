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
  return request({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    method: 'DELETE',
    TaiKhoan: taiKhoan,
  });
};

export const UpdateUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: 'POST',
    data,
  });
};

export const addUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: 'POST',
    data,
  });
};
