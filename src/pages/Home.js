import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeroSide from '../components/Home/HeroSlide';
import { OutlineButton } from '../components/UI/Button';
import MovieSlide from '../components/Home/MovieSlide';
import MoviesList from '../components/Home/MoviesList';
import TrailerModal from '../components/UI/Modal';
import { request } from '../services/axios.configs';
import { FaSearch } from 'react-icons/fa';
import Cinema from '../components/Home/Cinema';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, SetSearchValue] = useState('');
  const [filteredMovies, SetFilteredMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await request.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`);
      // console.log(result.data.content);
      setMovies(result.data.content);
    };
    const fetchCinemas = async () => {
      const result = await request.get(
        'QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03'
      );
      // console.log(result.data.content);
      setCinemas(result.data.content);
    };

    fetchMovies();
    fetchCinemas();
  }, []);

  useEffect(() => {
    const filtered = movies.filter((m) =>
      m.tenPhim.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    searchValue.trim() === '' ? SetFilteredMovies(movies) : SetFilteredMovies(filtered);
  }, [movies, searchValue]);

  return (
    <>
      <TrailerModal />
      <HeroSide />
      <Wrapper className='container'>
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
          <MoviesList movies={filteredMovies} />
          <Cinema cinemas={cinemas} />
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
