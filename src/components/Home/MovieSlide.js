import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';

import styled from 'styled-components';
import MovieCard from './MovieCard';

const MovieSlide = ({ movies }) => {
  SwiperCore.use([Autoplay]);

  return (
    <Wrapper className='movie-list'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        // autoplay={true}
      >
        {movies?.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.movie-list {
    .swiper-slide {
      width: 15%;
      @media only screen and (max-width: 1024px) {
        width: 30%;
      }
      @media only screen and (max-width: 600px) {
        width: 40%;
      }
    }
  }
`;

export default MovieSlide;
