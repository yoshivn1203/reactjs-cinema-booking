import React from 'react';

import styled from 'styled-components';
import MovieCard from './MovieCard';

const MoviesList = ({ movies }) => {
  const listMovies = movies.filter((movie) => movie.dangChieu === true);
  // console.log(listMovies);

  return (
    <Wrapper className='movie-list'>
      {listMovies.map((movie, i) => (
        <MovieCard key={i} movie={movie} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.movie-list {
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-content: center;
    align-items: stretch;
    row-gap: 3rem;
    column-gap: 1rem;
    @media only screen and (max-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
`;

export default MoviesList;
