import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { OutlineButton } from '../UI/Button';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import { formatShortDate } from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai';

const MovieCardForList = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='movie-card' style={{ backgroundImage: `url(${movie.hinhAnh})` }}>
        <Button onClick={() => navigate(`movies/${movie.maPhim}`)}>Đặt Vé</Button>

        <OutlineButton onClick={() => dispatch(openModal(movie.trailer))}>
          Trailer
        </OutlineButton>
        <div className='listMovie--rate '>
          {movie.danhGia}/10 <AiFillStar />
        </div>
      </div>
      <div className='name'>
        <h4>{movie.tenPhim}</h4>
      </div>
      <div className='release-date'>
        <p>Khởi Chiếu:</p>
        <p>{formatShortDate(movie.ngayKhoiChieu)}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid var(--dark-gray);
  border-radius: 10px;
  display: grid;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  .movie-card {
    position: relative;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 160%;
    margin-bottom: 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;

    .listMovie--rate {
      position: absolute;
      top: -7px;
      left: -10px;
      height: 30px;
      background: rgba(255, 0, 0, 0.658);
      font-size: 1rem;
      color: #ffffff;
      padding: 10px;
      z-index: 10;
      border-radius: 2px;
      display: flex;
      align-items: center;
    }
    .listMovie--rate svg {
      margin-left: 0.3rem;
      font-size: 1rem;
    }
    .listMovie--rate:after {
      position: absolute;
      content: '';
      bottom: -9px;
      left: 0;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid rgba(255, 0, 0, 0.658);
    }

    .btn {
      position: absolute;
      white-space: nowrap;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .btn-outline {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 0.8;
    }

    &:hover .btn {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  .name {
    padding: 0 0.5rem;
    text-align: center;
    padding-bottom: 1rem;
    color: var(--primary-yellow);
    text-transform: capitalize;
  }

  .release-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0.5rem;
    font-size: 0.9rem;
    color: var(--light-gray);
  }
`;

export default MovieCardForList;
