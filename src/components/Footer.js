import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/new-logo.png';
import bg from '../assets/footer-bg.jpg';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaTelegramPlane,
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <Wrapper className='footer-section'>
      <div className='container'>
        <div className='footer-cta'>
          <div className='row'>
            <div className='single-cta'>
              <FaMapMarkerAlt />
              <div className='cta-text'>
                <h4>Địa Chỉ</h4>
                <span>103 Nguyễn Hữu Dật, Hải Châu, Đà Nẵng</span>
              </div>
            </div>
            <div className='single-cta'>
              <FaPhoneAlt />
              <div className='cta-text'>
                <h4>Liên Hệ</h4>
                <span>98765432100</span>
              </div>
            </div>
            <div className='single-cta'>
              <FaEnvelopeOpen />
              <div className='cta-text'>
                <h4>Email</h4>
                <span>mail@info.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-content'>
          <div className='row'>
            <div className='footer-widget'>
              <div className='footer-logo'>
                <a href='index.html'>
                  <img src={logo} className='img-fluid' alt='logo' />
                </a>
              </div>
              <div className='footer-text'>
                <p>
                  Nằm trong top 5 cụm rạp lớn nhất toàn cầu và là cụm rạp lớn nhất Việt
                  Nam. Mục tiêu của chúng tôi là trở thành hình mẫu điển hình đóng góp cho
                  sự phát triển của ngành điện ảnh.
                </p>
              </div>
              <div className='footer-social-icon'>
                <span>Follow us</span>
                <FaFacebookF className='facebook-bg' />
                <FaTwitter className='twitter-bg' />
                <FaGooglePlusG className='google-bg' />
              </div>
            </div>
            <div className='footer-widget'>
              <div className='footer-widget-heading'>
                <h3>Hỗ Trợ</h3>
              </div>
              <ul>
                <li>
                  <Link to='#'>Chính Sách</Link>
                </li>
                <li>
                  <Link to='#'>Điều Khoản</Link>
                </li>
                <li>
                  <Link to='#'>Dịch Vụ</Link>
                </li>
                <li>
                  <Link to='#'>Bình Luận</Link>
                </li>
                <li>
                  <Link to='#'>Tuyển Dụng</Link>
                </li>
                <li>
                  <Link to='#'>Giới Thiệu</Link>
                </li>
                <li>
                  <Link to='#'>Góp Ý</Link>
                </li>
                <li>
                  <Link to='#'>Hợp Tác</Link>
                </li>
                <li>
                  <Link to='#'>Liên Hệ</Link>
                </li>
                <li>
                  <Link to='#'>Tin Tức</Link>
                </li>
              </ul>
            </div>
            <div className='footer-widget'>
              <div className='footer-widget-heading'>
                <h3>Đăng Ký</h3>
              </div>
              <div className='footer-text'>
                <p>
                  Nhận lịch chiếu phim mới nhất và chương trình khuyến mãi từ chúng tôi.
                </p>
              </div>
              <div className='subscribe-form'>
                <form>
                  <input type='text' placeholder='Email' />
                  <button type='button'>
                    <FaTelegramPlane />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright-area'>
        <div className='container'>
          <div className='row-copyright'>
            <div className='copyright-text'>
              <p>
                Copyright © 2022, All Right Reserved{' '}
                <a href='https://github.com/yoshivn1203'>Yoshi</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.footer-section {
    /* background: #151414; */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
    position: relative;
    .container {
      padding: 0 1rem;
    }
  }
  ul {
    margin: 0px;
    padding: 0px;
  }

  .footer-cta {
    border-bottom: 1px solid var(--secondary-gray);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
  }
  .single-cta {
    display: flex;
    align-items: center;
  }
  .single-cta svg {
    color: var(--primary-yellow);
    font-size: 2rem;
  }
  .cta-text {
    padding-left: 15px;
    display: inline-block;
  }
  .cta-text h4 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .cta-text span {
    color: #fff;
    font-size: 15px;
  }
  .footer-content {
    position: relative;
    z-index: 2;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .footer-pattern img {
    position: absolute;
    top: 0;
    left: 0;
    height: 330px;
    background-size: cover;
    background-position: 100% 100%;
  }
  .footer-logo {
    margin-bottom: 30px;
  }
  .footer-logo img {
    max-width: 200px;
  }
  .footer-text p {
    margin-bottom: 14px;
    font-size: 14px;
    color: #fff;
    line-height: 28px;
  }
  .footer-social-icon {
    cursor: pointer;
    span {
      color: #fff;
      display: block;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Poppins', sans-serif;
      margin-bottom: 20px;
    }
    svg {
      font-size: 2rem;
      padding: 0.3rem;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  .facebook-bg {
    background: #3b5998;
  }
  .twitter-bg {
    background: #55acee;
  }
  .google-bg {
    background: #dd4b39;
  }
  .footer-widget-heading h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 40px;
    position: relative;
  }
  .footer-widget-heading h3::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -15px;
    height: 2px;
    width: 50px;
    background: var(--primary-yellow);
  }
  .footer-widget ul li {
    display: inline-block;
    width: 50%;
    margin-bottom: 12px;
  }
  .footer-widget ul li a:hover {
    color: var(--primary-yellow);
  }
  .footer-widget ul li a {
    color: #fff;
    text-transform: capitalize;
  }
  .subscribe-form {
    position: relative;
    overflow: hidden;
  }
  .subscribe-form input {
    width: 100%;
    padding: 14px 28px;
    background: #2e2e2e;
    border: 1px solid #2e2e2e;
    color: #fff;
    outline: none;
  }
  .subscribe-form button {
    position: absolute;
    right: 0;
    background: var(--primary-yellow);
    padding: 13px 20px;
    border: 1px solid var(--primary-yellow);
    top: 0;
    cursor: pointer;
  }
  .subscribe-form button svg {
    color: #fff;
    font-size: 22px;
    transform: rotate(-6deg);
  }
  .copyright-area {
    background: var(--primary-black);
    padding: 1rem 0;
  }
  .copyright-text p {
    margin: 0;
    font-size: 1rem;
    color: #fff;
  }
  .copyright-text p a {
    color: var(--primary-yellow);
  }

  .row-copyright {
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 1024px) {
      padding-bottom: 4rem;
    }
  }
`;

export default Footer;
