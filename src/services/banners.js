import { request } from "./axios.configs";

export const getBanners = () => {
  return request({
    url: "QuanLyPhim/LayDanhSachBanner",
    method: "GET",
  });
};
