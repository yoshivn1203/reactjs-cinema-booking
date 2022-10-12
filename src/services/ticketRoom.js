import { request } from "./axios.configs";

export const getTicketRoomApi = (showtimeId) => {
  return request({
    url: `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`,
    method: "GET",
  });
};

export const bookingApi = (data) => {
  return request({
    url: "/QuanLyDatVe/DatVe",
    method: "post",
    data,
  });
};
