import { request } from './axios.configs';
import { MOVIE_GROUP_ID } from '../utils/common';

//Get all movies in home page
export const getMovies = () => {
  return request.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${MOVIE_GROUP_ID}`);
};

//Get all cinema show time in home page
export const getCinemas = () => {
  return request.get(
    `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MOVIE_GROUP_ID}`
  );
};

// Get movies info in ticket room

export const getTicketRoomInfo = (showtimeId) => {
  return request.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`);
};

export const bookingApi = (data) => {
  return request({
    url: '/QuanLyDatVe/DatVe',
    method: 'post',
    data,
  });
};
