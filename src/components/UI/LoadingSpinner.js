import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <Wrapper className='backdrop'>
      <div className='loading-spiner'></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
    .loading-spiner {
      width: 6rem;
      height: 6rem;
      margin: 0 auto;
      margin-top: 10rem;
      border-radius: 50%;
      border: 3px solid #ccc;
      border-top-color: var(--primary-yellow);
      animation: spinner 0.6s linear infinite;
    }
  }
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
