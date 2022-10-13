import React from 'react';
import { Link } from 'react-router-dom';

import HeroSide from '../components/Home/HeroSlide';
import { OutlineButton } from '../components/UI/Button';
import MovieList from '../components/Home/MovieList';
import TrailerModal from '../components/UI/Modal';

const Home = () => {
  return (
    <>
      <TrailerModal />
      <HeroSide />
      <div className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Trending Movies</h2>
            <Link to='/movie'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList />
        </div>
      </div>
    </>
  );
};

export default Home;
