import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { OutlineButton } from '../UI/Button';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper
        className='movie-card'
        style={{ backgroundImage: `url(${movie.hinhAnh})` }}
      >
        <Button onClick={() => navigate(`movies/${movie.maPhim}`)}>Đặt Vé</Button>

        <OutlineButton onClick={() => dispatch(openModal(movie.trailer))}>
          Trailer
        </OutlineButton>
      </Wrapper>
      <h4>{movie.tenPhim}</h4>
    </div>
  );
};

const Wrapper = styled.div`
  &.movie-card {
    position: relative;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 160%;
    border-radius: 30px;
    margin-bottom: 1rem;
    cursor: pointer;

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
      border-radius: 30px;
    }

    &:hover::before {
      opacity: 0.8;
    }

    &:hover .btn {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export default MovieCard;
