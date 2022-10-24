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

// for movies detail page
export const getMoviesDetails = (id) => {
  return request.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
};

// Get movies info in ticket room

export const getTicketRoomInfo = (showtimeId) => {
  return request.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`);
};

export const bookingMovie = (data) => {
  return request.post('/QuanLyDatVe/DatVe', data);
};
