import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import HeroSide from '../components/Home/HeroSlide';
import { OutlineButton } from '../components/UI/Button';
import MovieSlide from '../components/Home/MovieSlide';
import MoviesList from '../components/Home/MoviesList';
import TrailerModal from '../components/UI/Modal';
import { request } from '../services/axios.configs';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await request.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`);
      // console.log(result.data.content);
      setMovies(result.data.content);
    };
    fetchData();
  }, []);

  return (
    <>
      <TrailerModal />
      <HeroSide />
      <div className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Phim Sắp Chiếu</h2>
            <Link to='/movie'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieSlide movies={movies} />
          <div className='section__header mb-2'>
            <h2>Phim Đang Chiếu</h2>
            <Link to='/movie'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MoviesList movies={movies} />
        </div>
      </div>
    </>
  );
};

export default Home;
