import { MOVIE_GROUP_ID } from "../constants/common";
import { request } from "./axios.configs";

// export const getCinemaApi = () => {
//   return request({
//     url: "QuanLyRap/LayThongTinHeThongRap",
//     method: "GET",
//   });
// };

export const getCinemaApi = () => {
  return request({
    url:`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MOVIE_GROUP_ID}`,
    method: "GET"
  })
}