import { request } from "../configs/axios"


export const LoginApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/DangNhap',
        method: 'POST',
        data,
    })
}