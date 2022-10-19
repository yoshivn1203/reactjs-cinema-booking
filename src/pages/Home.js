import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loading, finishLoading } from '../features/uiSlice';
import { OutlineButton } from '../components/UI/Button';
import TrailerModal from '../components/UI/Modal';
import { HeroSlide, MovieSlide, MoviesList, Sidebar } from '../components/Home';
import { FaSearch } from 'react-icons/fa';
import { getCinemas, getMovies } from '../services/movies';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, SetSearchValue] = useState('');
  const [filteredMovies, SetFilteredMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(loading());

      const result = await getMovies();
      // console.log(result.data.content);
      setMovies(result.data.content);
      dispatch(finishLoading());
    };
    const fetchCinemas = async () => {
      dispatch(loading());

      const result = await getCinemas();
      // console.log(result.data.content);
      setCinemas(result.data.content);
      dispatch(finishLoading());
    };

    fetchMovies();
    fetchCinemas();
  }, [dispatch]);

  useEffect(() => {
    const filtered = movies.filter((m) =>
      m.tenPhim.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    searchValue.trim() === '' ? SetFilteredMovies(movies) : SetFilteredMovies(filtered);
  }, [movies, searchValue]);

  return (
    <>
      <TrailerModal />
      <HeroSlide />
      <Sidebar cinemas={cinemas} />
      <Wrapper className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Phim Sắp Chiếu</h2>
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
