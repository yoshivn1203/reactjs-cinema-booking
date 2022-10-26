import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TrailerModal from '../components/UI/Modal';
import { HeroSlide, MovieSlide, MoviesList, Sidebar } from '../components/Home';
import { FaSearch } from 'react-icons/fa';
import { getCinemas, getMovies } from '../services/moviesApi';
import useFetch from '../hooks/useFetch';
import ButtonBackToTop from '../components/ButtonBackToTop';

const Home = () => {
  const { state: movies } = useFetch(getMovies);
  const { state: cinemas } = useFetch(getCinemas);
  const [searchValue, SetSearchValue] = useState('');
  const [filteredMovies, SetFilteredMovies] = useState([]);
  const myRef = useRef(null);

  useEffect(() => {
    if (movies) {
      const filtered = movies.filter((m) =>
        m.tenPhim.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
      searchValue.trim() === '' ? SetFilteredMovies(movies) : SetFilteredMovies(filtered);
    }
  }, [movies, searchValue]);

  return (
    <>
      <TrailerModal />
      <HeroSlide />
      <ButtonBackToTop />
      {cinemas && <Sidebar cinemas={cinemas} />}
      <Wrapper className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Phim Sắp Chiếu</h2>
          </div>
          {movies && <MovieSlide movies={movies} />}
          <div ref={myRef} className='section__header mb-2'>
            <h2>Phim Đang Chiếu</h2>
            <div className='search'>
              <form className='search-form'>
                <input
                  type='text'
                  placeholder='Tìm Phim'
                  className='form-input'
                  value={searchValue}
                  onChange={(e) => SetSearchValue(e.target.value)}
                />
                <button type='button' className='submit-btn'>
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
          {movies && <MoviesList movies={filteredMovies} myRef={myRef} />}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .search {
    width: 20%;
    transition: width 0.3s ease;
  }

  .search:hover,
  .search:focus-within {
    transition: width 0.3s ease;
    width: 30%;
  }
  .search-form {
    display: flex;
  }

  .search-form:focus-visible {
    outline: none;
  }
  .form-input {
    width: 100%;
  }

  .form-input:focus-visible {
    outline: none;
  }
  .form-input,
  .submit-btn {
    padding: 0;
    border: none;
    outline: none;
    border-radius: 0;
    font-size: 1.4rem;
    font-weight: bold;
    background: transparent;
    color: var(--primary-yellow);
    border-bottom: 2px solid var(--primary-yellow);
  }
  .submit-btn:hover {
    background: transparent;
  }
  .form-input {
    color: var(--primary-white);
  }
  .form-input::placeholder {
    color: var(--secondary-gray);
  }
`;

export default Home;
