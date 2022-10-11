import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  return (
    <Wrapper
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
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
    background-color: #ff0000;
    color: #fff;
    border-radius: 30px;
    padding: 0.5rem 1.8rem;
    font-size: 1.5rem;
    font-weight: 600;
    box-shadow: 0px 0px 7px 8px #ff00004d;
    transition: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px 0.3s ease;
    position: relative;
  }
  &.btn:hover {
    box-shadow: 0px 0px 7px 15px #ff00004d;
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
    color: #ff0000;
    background-color: #fff;
  }

  &.btn.small {
    border-width: 2px;
    padding: 0.25rem 1.5rem;
    font-size: 1rem;
  }
`;

export default Button;
