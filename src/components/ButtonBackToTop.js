import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaAngleDoubleUp } from 'react-icons/fa';

const ButtonBackToTop = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const showButton = () => {
      if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        buttonRef.current.classList.add('show');
      } else {
        buttonRef.current.classList.remove('show');
      }
    };
    window.addEventListener('scroll', showButton);
    return () => {
      window.removeEventListener('scroll', showButton);
    };
  }, []);

  return (
    <Wrapper ref={buttonRef}>
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <FaAngleDoubleUp />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  visibility: hidden;
  z-index: 2;
  &.show {
    display: block;
    visibility: visible;
  }
  button {
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    padding: 0.4rem 0.6rem;
    z-index: 2;
    font-size: 1.5rem;
    color: var(--primary-yellow);
    background-color: transparent;
    border-radius: 50%;
    border: solid 2px var(--primary-yellow);
    cursor: pointer;
    animation: jump 2s ease-in-out infinite;
  }

  @keyframes jump {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(15%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

export default ButtonBackToTop;
