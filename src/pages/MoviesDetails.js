import React from 'react';
import { useParams } from 'react-router-dom';

const MoviesDetails = () => {
  const param = useParams();
  return <h1>{param.id}</h1>;
};

export default MoviesDetails;
