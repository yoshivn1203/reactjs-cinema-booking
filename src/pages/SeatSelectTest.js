import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../services/axios.configs';

const SeatSelectTest = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

  console.log(movieInfo);
  const { maLichChieu, tenCumRap, ngayChieu, tenPhim } = movieInfo;
  useEffect(() => {
    const fetchShowTime = async () => {
      const result = await request.get(
        `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      setMovieInfo(result.data.content.thongTinPhim);
    };
    fetchShowTime();
  }, []);
  return (
    <div>
      <p>{maLichChieu}</p>
      <p>{tenCumRap}</p>
      <p>{ngayChieu}</p>
      <p>{tenPhim}</p>
    </div>
  );
};

export default SeatSelectTest;
