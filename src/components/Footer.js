import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import bg from '../assets/footer-bg.jpg';
import logo from '../assets/tmovie.png';

const Footer = () => {
  return (
    <Wrapper className='footer' style={{ backgroundImage: `url(${bg})` }}>
      <div className='footer__content container'>
        <div className='footer__content__logo'>
          <div className='logo'>
            <img src={logo} alt='' />
            <Link to='/'>tMovies</Link>
          </div>
        </div>
        <div className='footer__content__menus'>
          <div className='footer__content__menu'>
            <Link to='/'>Home</Link>
            <Link to='/'>Contact us</Link>
            <Link to='/'>Term of services</Link>
            <Link to='/'>About us</Link>
          </div>
          <div className='footer__content__menu'>
            <Link to='/'>Live</Link>
            <Link to='/'>FAQ</Link>
            <Link to='/'>Premium</Link>
            <Link to='/'>Pravacy policy</Link>
          </div>
          <div className='footer__content__menu'>
            <Link to='/'>You must watch</Link>
            <Link to='/'>Recent release</Link>
            <Link to='/'>Top IMDB</Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.footer {
    position: relative;
    padding: 6rem 2rem;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;

    .footer__content {
      max-width: 1000px;

      .footer__content__logo {
        .logo {
          font-size: 2.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
            width: 50px;
          }
        }
        display: flex;
        text-align: center;
        justify-content: center;
        margin-bottom: 3rem;
      }

      .footer__content__menus {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        @media only screen and (max-width: 600px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .footer__content__menu {
        display: flex;
        text-align: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 1rem;

        font-size: 1.5rem;
        font-weight: 600;

        a:nth-of-type(n + 2) {
          margin-top: 1rem;
        }
      }
    }
  }
`;

export default Footer;
