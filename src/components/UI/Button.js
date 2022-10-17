import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  return (
    <Wrapper
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
      type={props.type}
    >
      {props.children}
    </Wrapper>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
      type={props.type}
    >
      {props.children}
    </Button>
  );
};

const Wrapper = styled.button`
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  &.btn {
    border: 4px solid transparent;
    background-color: var(--primary-yellow);
    color: #fff;
    border-radius: 30px;
    padding: 0.5rem 1.8rem;
    font-size: 1.5rem;
    font-weight: 600;
    box-shadow: 0px 0px 7px 8px var(--yellow-shadow);
    transition: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px 0.3s ease;
    position: relative;
  }
  &.btn:hover {
    box-shadow: 0px 0px 7px 12px var(--yellow-shadow);
  }

  &.btn-outline {
    border: 3px solid #fff;
    background-color: transparent;
    color: #fff;
    box-shadow: unset;
    transition: color 0.3s ease, background-color 0.3s ease;
  }

  &.btn-outline:hover {
    box-shadow: unset;
    color: var(--primary-red);
    background-color: #fff;
  }

  &.small {
    border-width: 2px;
    padding: 0.25rem 1.5rem;
    font-size: 1rem;
  }

  &.medium {
    padding: 0.3rem 1.5rem;
    font-size: 1.2rem;
    box-shadow: none;
  }
  &.medium:hover {
    box-shadow: none;
    /* background-color: var(--secondary-yellow); */
  }
`;

export default Button;
