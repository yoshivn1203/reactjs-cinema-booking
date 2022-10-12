import axios from "axios";
import { request } from "../axios.configs";
// import { request } from "../configs/axios";
// import { BASE_URL, TOKENCYBERSOFT } from "../constants/common";

const fetchFilmListApi = () => {
    // return axios({
    //     url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
    //     method: 'GET',
    //     headers:{
    //         TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOSIsIkhldEhhblN0cmluZyI6IjE5LzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NDA4NjQwMDAwMCIsIm5iZiI6MTY0NTk4MTIwMCwiZXhwIjoxNjc0MjM0MDAwfQ.YESwad1hPeFZLi1alQUINpqBwiG-eLBBTADYwGZBfQc',
    //     }
    // })
    return request({
        url: '/QuanLyPhim/LayDanhSachPhim?maNhom=GP02',
        method: 'get',
    })
};

const deleteFilm = (maPhim) => {
    return request({
        url: `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: 'delete',
        MaPhim: maPhim,
    })
}

const addFilmUpLoadApi = (data) => {
    return request({
        url: "/QuanLyPhim/ThemPhimUpLoadHinh",
        method: 'POST',
        data,
    })
}

const fetchFilmDetailApi = (maPhim) => {
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
        method: "GET",
    })
}

const updateFilmApi = (data) =>{
    return request({
        url: "/QuanLyPhim/CapNhatPhimUpload",
        method: 'POST',
        data,
    })
}

const fetchCinemaListApi = () => {
    return request({
        url: "QuanLyRap/LayThongTinHeThongRap",
        method: 'GET',
    })
}

const fetchCinemaGroupListApi = (maRap) => {
    return request({
        url: `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
        method: 'GET',
    })
}

const createTimeApi = (data) => {
    return request({
        url: "/QuanLyDatVe/TaoLichChieu",
        method: 'POST',
        data,
    })
}

export {fetchFilmListApi, 
    deleteFilm, 
    addFilmUpLoadApi, 
    fetchFilmDetailApi, 
    updateFilmApi, 
    fetchCinemaListApi,
    fetchCinemaGroupListApi,
    createTimeApi,
};