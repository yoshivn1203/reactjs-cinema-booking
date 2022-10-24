import { MOVIE_GROUP_ID } from '../../utils/common';
import { request } from '../axios.configs';

export const fetchMoviesListApi = (page, rowsPerPage) => {
  return request.get(
    `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${MOVIE_GROUP_ID}&soTrang=${
      page + 1
    }&soPhanTuTrenTrang=${rowsPerPage}`
  );
};

export const fetchSearchMoviesApi = (page, rowsPerPage, searchValue) => {
  return request.get(
    `/QuanLyPhim/LayDanhSachPhimPhanTrang?MaNhom=${MOVIE_GROUP_ID}&tenPhim=${searchValue.trim()}&soTrang=${
      page + 1
    }&soPhanTuTrenTrang=${rowsPerPage}`
  );
};

export const deleteMovieApi = (maPhim) => {
  return request.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
};

const addFilmUpLoadApi = (data) => {
  return request({
    url: '/QuanLyPhim/ThemPhimUpLoadHinh',
    method: 'POST',
    data,
  });
};

const fetchFilmDetailApi = (maPhim) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
    method: 'GET',
  });
};

const updateFilmApi = (data) => {
  return request({
    url: '/QuanLyPhim/CapNhatPhimUpload',
    method: 'POST',
    data,
  });
};

const fetchCinemaListApi = () => {
  return request({
    url: 'QuanLyRap/LayThongTinHeThongRap',
    method: 'GET',
  });
};

const fetchCinemaGroupListApi = (maRap) => {
  return request({
    url: `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
    method: 'GET',
  });
};

const createTimeApi = (data) => {
  return request({
    url: '/QuanLyDatVe/TaoLichChieu',
    method: 'POST',
    data,
  });
};
