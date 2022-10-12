import React from 'react';

import { Link } from 'react-router-dom';

import Button from './Button';

import { category } from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';
import styled from 'styled-components';

const MovieCard = (props) => {
  const item = props.item;

  const link = '/' + category[props.category] + '/' + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <Wrapper className='movie-card' style={{ backgroundImage: `url(${bg})` }}>
        <Button>Play</Button>
      </Wrapper>
      <h3>{item.title || item.name}</h3>
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
