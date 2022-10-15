import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../UI/Button';

const Cinema = ({ cinemas }) => {
  const [selectedCinema, SetSelectedCinema] = useState('BHDStar');
  const [selectedLocation, setSelectedLocation] = useState('bhd-star-cineplex-bitexco');
  const [selectedMovie, setSelectedMovie] = useState('1316');
  const [selectedShowTime, setSelectedShowTime] = useState('16207');
  const navigate = useNavigate();

  const location = cinemas.find((c) => c.maHeThongRap === selectedCinema)?.lstCumRap;
  const movieList = location?.find((l) => l.maCumRap === selectedLocation)?.danhSachPhim;
  const showTime = movieList?.find(
    (m) => m.maPhim === Number(selectedMovie)
  )?.lstLichChieuTheoPhim;

  useEffect(() => {
    location && setSelectedLocation(location[0].maCumRap);
    movieList && setSelectedMovie(movieList[0].maPhim);
    showTime && setSelectedShowTime(showTime[0].maLichChieu);
    // eslint-disable-next-line
  }, [selectedCinema]);

  useEffect(() => {
    movieList && setSelectedMovie(movieList[0].maPhim);
    showTime && setSelectedShowTime(showTime[0].maLichChieu);
    // eslint-disable-next-line
  }, [selectedLocation]);

  useEffect(() => {
    showTime && setSelectedShowTime(showTime[0].maLichChieu);
    // eslint-disable-next-line
  }, [selectedMovie]);

  return (
    <Wrapper>
      <div className='logo-container mb-3'>
        {cinemas.map((c) => {
          return (
            <img
              src={c.logo}
              alt={c.tenHeThongRap}
              key={c.maHeThongRap}
              className={selectedCinema === c.maHeThongRap ? 'selected' : ''}
              onClick={() => SetSelectedCinema(c.maHeThongRap)}
            />
          );
        })}
      </div>

      <div className='form-control mb-2'>
        <h3>Cụm Rạp</h3>
        <select
          name='location'
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className='location'
        >
          {location?.map((l) => {
            return (
              <option key={l.maCumRap} value={l.maCumRap}>
                {l.tenCumRap}
              </option>
            );
          })}
        </select>
      </div>
      <div className='form-control mb-2'>
        <h3>Chọn Phim</h3>
        <select
          name='movie'
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          className='movie'
        >
          {movieList?.map((m) => {
            return (
              <option key={m.maPhim} value={m.maPhim}>
                {m.tenPhim}
              </option>
            );
          })}
        </select>
      </div>
      <div className='form-control mb-3'>
        <h3>Chọn Suất Chiếu</h3>
        <select
          name='showTime'
          value={selectedShowTime}
          onChange={(e) => setSelectedShowTime(e.target.value)}
          className='showTime'
        >
          {showTime?.map((m) => {
            return (
              <option key={m.maLichChieu} value={m.maLichChieu}>
                {m.ngayChieuGioChieu}
              </option>
            );
          })}
        </select>
      </div>
      <Button onClick={() => navigate(`showTime/${selectedShowTime}`)}>Đặt Vé</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .logo-container {
    display: flex;
    gap: 2rem;
    img {
      width: 5rem;
      opacity: 0.3;
      cursor: pointer;
    }
    .selected {
      opacity: 1;
    }
  }
`;

export default Cinema;
