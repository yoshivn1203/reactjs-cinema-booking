import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

import styled from 'styled-components';
import MovieCardForList from './MovieCardForList';

const MoviesList = ({ movies, myRef }) => {
  const listMovies = movies.filter((movie) => movie.dangChieu === true);
  const [limitedList, setLimitedList] = useState(listMovies);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    if (!showMore) {
      setLimitedList(listMovies.slice(0, 10));
    } else {
      setLimitedList(listMovies);
    }
    // eslint-disable-next-line
  }, [showMore, movies]);
  return (
    <Wrapper>
      <div className='movie-list'>
        {limitedList.map((movie, i) => (
          <MovieCardForList key={i} movie={movie} />
        ))}
      </div>
      <div className={`toggle-btn ${showMore ? 'showLess' : 'showMore'}`}>
        <button
          onClick={() => {
            setShowMore(!showMore);
            showMore && myRef.current.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {showMore ? 'Ẩn Bớt' : 'Xem Thêm'}
        </button>
        <FaLongArrowAltRight />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-content: center;
    align-items: stretch;
    row-gap: 3rem;
    column-gap: 2rem;
    @media only screen and (max-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
  .toggle-btn {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background-color: transparent;
      color: var(--primary-white);
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
    button:hover {
      color: var(--primary-yellow);
    }
    svg {
      margin-left: 0.5rem;
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }
  }
  .showMore {
    button:hover + svg {
      color: var(--primary-yellow);
      transform: rotate(90deg);
    }
  }
  .showLess {
    button:hover + svg {
      color: var(--primary-yellow);
      transform: rotate(-90deg);
    }
  }
`;

export default MoviesList;
