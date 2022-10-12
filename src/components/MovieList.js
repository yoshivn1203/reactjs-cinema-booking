import React, { useState, useEffect } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import styled from 'styled-components';

import tmdbApi, { category } from '../api/tmdbApi';

import MovieCard from './MovieCard';

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <Wrapper className='movie-list'>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        // navigation
        autoplay={{ delay: 3000 }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
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

export default MovieList;
