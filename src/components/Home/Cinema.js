import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../UI/Button';
import { useDispatch } from 'react-redux';
import { closeSideBar } from '../../features/uiSlice';
import formatDate from '../../utils/formatDate';

const Cinema = ({ cinemas }) => {
  const [selectedCinema, SetSelectedCinema] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = cinemas.find((c) => c.maHeThongRap === selectedCinema)?.lstCumRap;
  const movieList = location?.find((l) => l.maCumRap === selectedLocation)?.danhSachPhim;
  const showTime = movieList?.find(
    (m) => m.maPhim === Number(selectedMovie)
  )?.lstLichChieuTheoPhim;

  useEffect(() => {
    if (cinemas?.length > 0) {
      SetSelectedCinema(cinemas[0].maHeThongRap);
    }
  }, [cinemas]);

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
      <h2>Đặt Vé Nhanh</h2>
      <div className='logo-container mb-3'>
        {cinemas.map((c) => {
          return (
            <div
              key={c.maHeThongRap}
              className={`logo ${selectedCinema === c.maHeThongRap ? 'selected' : ''}`}
              onClick={() => SetSelectedCinema(c.maHeThongRap)}
            >
              <img src={c.logo} alt={c.tenHeThongRap} />
              <p>{c.tenHeThongRap}</p>
            </div>
          );
        })}
      </div>

      <div className='form-control mb-3'>
        <h3>-- Cụm Rạp --</h3>
        <div className='select'>
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
      </div>
      <div className='form-control mb-3'>
        <h3>-- Chọn Phim --</h3>
        <div className='select'>
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
      </div>
      <div className='form-control mb-4'>
        <h3>-- Chọn Suất Chiếu --</h3>
        <div className='select'>
          <select
            name='showTime'
            value={selectedShowTime}
            onChange={(e) => setSelectedShowTime(e.target.value)}
            className='showTime'
          >
            {showTime?.map((m) => {
              return (
                <option key={m.maLichChieu} value={m.maLichChieu}>
                  {formatDate(m.ngayChieuGioChieu)}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Button
        className='medium'
        onClick={() => {
          navigate(`/showTime/${selectedShowTime}`);
          dispatch(closeSideBar());
        }}
      >
        Đặt Vé
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 1rem;
  .logo-container {
    display: flex;
    .logo {
      padding: 1rem;
      filter: brightness(50%);
      opacity: 0.5;
      cursor: pointer;
      text-align: center;
      width: 6.5rem;
      p {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--primary-white);
      }
      transition: all 0.5s ease;
    }
    .logo:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    .logo:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    img {
      width: 4rem;
    }
    .selected {
      filter: brightness(100%);
      filter: drop-shadow(4px 8px 12px rgb(3, 3, 3));
      opacity: 1;
      p {
        color: var(--primary-yellow);
      }
    }
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 1rem;
  }

  select {
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    flex: 1;
    padding: 0 1em;
    background-color: var(--lighter-transparent);
    color: var(--primary-white);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
  select option {
    background-color: var(--dark-gray);
  }
  .select {
    position: relative;
    display: flex;
    width: 27em;
    height: 3em;
    border-radius: 0.25em;
    overflow: hidden;
  }

  .select::after {
    content: '▼';
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
    background-color: var(--dark-gray);
    transition: 0.25s all ease;
    pointer-events: none;
  }
  .select:hover::after {
    color: var(--primary-yellow);
  }
`;

export default Cinema;
