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
          <div ref={myRef} className='section__header__center mb-2'>
            <h1>Phim Đang Chiếu</h1>
            <div className='search'>
              <form className='search-form'>
                <input
                  type='text'
                  placeholder='Tìm Phim'
                  className='form-input'
                  value={searchValue}
                  onChange={(e) => SetSearchValue(e.target.value)}
                />

                <FaSearch />
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
  .section__header {
    h2 {
      color: var(--primary-yellow);
    }
  }
  .section__header__center {
    position: relative;
    margin-top: 5rem;
    margin-bottom: 3rem;
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 1rem;
    border-top: solid 1px var(--primary-gray);
    h1 {
      position: absolute;
      top: -50%;
      left: 50%;
      color: var(--primary-yellow);
      transform: translate(-50%, 40%);
      background-color: var(--primary-black);
      padding: 0 2rem;
      @media only screen and (max-width: 600px) {
        padding: 0 0.5rem;
      }
    }
  }
  .search {
    width: 40%;
    margin-top: 3rem;
  }

  .search:hover,
  .search:focus-within {
    .search-form {
      border: none;
      border-radius: 0;
      border-bottom: 2px solid var(--primary-yellow);
      padding: 0.5rem 0;
    }
  }
  .search-form {
    display: flex;
    align-items: center;
    padding: 0.5rem 3rem;
    border: 2px solid var(--primary-yellow);
    border-radius: 30px;
    transition: all 0.5s ease;
    svg {
      font-size: 1.4rem;
      color: var(--primary-yellow);
    }
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
  .form-input {
    padding: 0;
    border: none;
    outline: none;
    border-radius: 0;
    font-size: 1.4rem;
    background: transparent;
    color: var(--primary-yellow);
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
