import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import bg from '../assets/footer-bg.jpg';
import logo from '../assets/logo2.png';

const Footer = () => {
  return (
    <Wrapper className='footer' style={{ backgroundImage: `url(${bg})` }}>
      <div className='footer__content container'>
        <div className='footer__content__logo'>
          <div className='logo'>
            <img src={logo} alt='' />
            <Link to='/'>Cyber</Link>
          </div>
        </div>
        <div className='footer__content__menus'>
          <div className='footer__content__menu'>
            <Link to='/'>Giới Thiệu</Link>
            <Link to='/'>Tiện Ích Online</Link>
            <Link to='/'>Thẻ Quà Tặng</Link>
            <Link to='/'>Tuyển Dụng</Link>
          </div>
          <div className='footer__content__menu'>
            <Link to='/'>Điều Khoản Chung</Link>
            <Link to='/'>Điều Khoản Giao Dịch</Link>
            <Link to='/'>Chính Sách Thanh Toán</Link>
            <Link to='/'>Chính Sách Bảo Mật</Link>
          </div>
          <div className='footer__content__menu'>
            <Link to='/'>Câu Hỏi Thường Gặp</Link>
            <Link to='/'>Chăm Sóc Khách Hàng</Link>
            <Link to='/'>Bình Luận Phim</Link>
            <Link to='/'>Góp Ý</Link>
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
      max-width: 1200px;

      .footer__content__logo {
        .logo {
          font-size: 2.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
            width: 60px;
          }
        }
        display: flex;
        text-align: center;
        justify-content: center;
        margin-bottom: 3rem;
      }

      .footer__content__menus {
        display: grid;
        grid-template-columns: repeat(3, auto);

        @media only screen and (max-width: 800px) {
          grid-template-columns: repeat(2, auto);
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
