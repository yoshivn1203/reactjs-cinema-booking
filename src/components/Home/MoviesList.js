import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';

import styled from 'styled-components';
import MovieCard from './MovieCard';

const MoviesList = ({ movies }) => {
  SwiperCore.use([Autoplay]);

  return (
    <Wrapper className='movie-list'>
      {movies?.map((item, i) => (
        <MovieCard key={i} item={item} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.movie-list {
    display: grid;
    grid-template-columns: repeat(5, auto);
    justify-content: center;
    gap: 1rem;
  }
`;

export default MoviesList;
