import React from 'react';
import styled from 'styled-components';

import dl from '../../assets/download-app.png';
import appstore from '../../assets/app-store.png';
// import google from '../../assets/google-play.png';
import taiApp from '../../assets/taiApp.gif';
import logo from '../../assets/logo-short.png';

const DownloadApp = () => {
  return (
    <Wrapper>
      <div className='info'>
        <h2>
          Tải App ngay và đăng ký thành viên để nhận được nhiều chương trình ưu đãi.
        </h2>
        <p>
          Đặt vé xem phim chưa bao giờ dễ dàng hơn. Chỉ với vài click để đặt vé xem phim ở
          hơn 50 cụm rạp trên toàn quốc với mức giá tốt nhất trong vòng 2 phút. Hãy tải
          ứng dụng để khám phá thế giới điện ảnh theo cách của riêng bạn.
        </p>
        <div className='store-img'>
          <img src={appstore} alt='' />
          {/* <img src={google} alt='' /> */}
        </div>
      </div>
      <div className='phone-img'>
        <img src={dl} alt='' className='big-img' />
        <div className='downloading'>
          <img src={logo} alt='' />
          <div className='text'>
            <p>Cyber Cinema</p>
            <p>Đang tải...</p>
          </div>
          <img src={taiApp} alt='' />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 7rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8rem;
  align-items: center;
  justify-items: center;
  background-color: var(--lightest-transparent);
  border-radius: 20px;
  padding: 2rem;

  .info {
    h2 {
      margin-bottom: 3rem;
    }
    p {
      margin-bottom: 2rem;
    }
    .store-img {
      display: flex;
      gap: 1rem;
      img {
        width: 23rem;
      }
      cursor: pointer;
    }
  }

  .phone-img {
    position: relative;
  }
  .big-img {
    max-width: 20rem;
  }
  .downloading {
    position: absolute;
    top: 70%;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20rem;
    background-color: #000000;
    border-radius: 20px;
    padding: 1rem;
    img {
      width: 4rem;
      cursor: pointer;
    }
  }
  .text {
    p:first-child {
      color: var(--primary-yellow);
      font-weight: bold;
      font-size: 1.1rem;
      padding-bottom: 0.5rem;
    }
    p:not(:first-child) {
      font-size: 0.9rem;
    }
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: auto;
    gap: 3rem;
  }
`;

export default DownloadApp;
