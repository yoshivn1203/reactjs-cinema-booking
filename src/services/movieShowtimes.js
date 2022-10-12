import { request } from "./axios.configs"

export const getMovieShowtimesApi = (movieId) => {
  return request({
    url: `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`
  })
}