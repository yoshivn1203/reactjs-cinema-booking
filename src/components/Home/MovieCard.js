import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';

const MovieCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <Link to='/'>
      <Wrapper className='movie-card' style={{ backgroundImage: `url(${item.hinhAnh})` }}>
        <Button onClick={() => dispatch(openModal)}>Play</Button>
      </Wrapper>
      <h3>{item.tenPhim}</h3>
    </Link>
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

    .btn {
      position: absolute;
      top: 50%;
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

    @media (hover: hover) and (pointer: fine) {
      &:hover::before {
        opacity: 0.8;
      }

      &:hover .btn {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`;

export default MovieCard;
