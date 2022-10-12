import { request } from "../axios.configs";

export const fetchShowTimeApi = (maPhim) => {
  return request({
    url: `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    method: "GET",
  });
};
