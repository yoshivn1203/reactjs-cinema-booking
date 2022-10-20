import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import styled from 'styled-components';
import logo from '../assets/logo2.png';
import { useSelector } from 'react-redux';

const headerNav = [
  {
    display: 'Trang Chủ',
    path: '/',
  },
  {
    display: 'Tin Tức',
    path: '/news',
  },
  {
    display: 'Khuyến Mãi',
    path: '/events',
  },
];

const Header = () => {
  const { pathname } = useLocation();

  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);
  const { userInfo } = useSelector((store) => store.user);
  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <Wrapper ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='logo'>
          <img src={logo} alt='' />
          <Link to='/'>Cyber</Link>
        </div>
        <ul className='header__nav'>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        {userInfo ? (
          <Dropdown />
        ) : (
          <ul className='login'>
            <li>
              <Link to='/sign-in'>Đăng Nhập</Link>
            </li>
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  height: 8rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 97;
  transition: height 0.3s ease, background-color 0.3s ease;
  &.shrink {
    height: 5rem;
    background-color: var(--primary-black);
  }
  .logo {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    align-items: start;

    img {
      margin-right: 10px;
      width: 60px;

      @media only screen and (max-width: 600px) {
        width: 30px;
        margin-right: 0;
      }
    }
  }
  .header__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 2rem;

    @media only screen and (max-width: 600px) {
      /* justify-content: center; */
    }
  }
  .header__nav,
  .login {
    display: flex;
    align-items: center;
    li {
      padding: 5px 0;
      font-weight: 700;
      position: relative;
      font-size: 1.5rem;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        transition: width 0.5s ease;
        height: 2px;
        background-color: var(--primary-yellow);
      }
      &.active::after,
      &:hover::after {
        width: 100%;
      }
    }
    li:nth-child(n + 2) {
      margin-left: 2rem;
    }
  }
  .MuiButton-text {
    color: var(--primary-white);
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: none;
    font-family: 'Montserrat';
    &:hover {
      color: var(--primary-yellow);
    }
  }

  @media only screen and (max-width: 1024px) {
    .logo {
      align-items: center;
    }
    .header__nav {
      position: fixed;
      bottom: -2px;
      left: 0;
      height: 5rem;
      width: 100%;
      background-color: var(--primary-black);
      padding: 0 2rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      li:nth-child(n + 2) {
        margin-left: 0;
      }
    }
  }
`;
