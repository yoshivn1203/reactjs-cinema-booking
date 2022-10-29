import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';

import styled from 'styled-components';
import MovieCard from './MovieCard';

const MovieSlide = ({ movies }) => {
  const slideMovies = movies.filter((movie) => movie.sapChieu === true);
  // console.log(slideMovies);

  return (
    <Wrapper className='movie-list mb-3'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {slideMovies.map((movie, i) => (
          <SwiperSlide key={i}>
            <MovieCard movie={movie} />
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
