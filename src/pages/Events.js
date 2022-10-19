import React from 'react';
import styled from 'styled-components';
import bg from '../assets/khuyen-mai.png';

const Events = () => {
  return (
    <Wrapper>
      <div className='img-container'>
        <img src={bg} alt='' />
      </div>
    </Wrapper>
  );
};

export default Events;

export const Wrapper = styled.div`
  .img-container {
    margin: 12rem auto 3rem auto;
    min-height: 500px;
    width: 60%;
    img {
      border-radius: 30px;
      width: 100%;
    }
    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
`;
