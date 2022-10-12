import React, { useState, useEffect } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import styled from 'styled-components';
import MovieCard from './MovieCard';

import { request } from '../services/axios.configs';

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await request.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`);
      console.log(result.data.content);
      setItems(result.data.content);
    };
    fetchData();
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
        {items?.map((item, i) => (
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

export default MovieList;
