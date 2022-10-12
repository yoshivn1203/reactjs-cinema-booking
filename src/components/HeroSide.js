import React from 'react';

import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Button, { OutlineButton } from './Button';
import Modal, { ModalContent } from './Modal';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/UiSlice';
import banners from '../assets/banner/banners';

const HeroSlide = () => {
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  return (
    <Wrapper className='hero-slide'>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {banners.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {banners.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </Wrapper>
  );
};

const HeroSlideItem = ({ item, className }) => {
  const dispatch = useDispatch();
  const background = item.backdrop_path;

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='hero-slide__item__content container'>
        <div className='hero-slide__item__content__info'>
          <h2 className='title'>{item.title}</h2>
          <div className='overview'>{item.overview}</div>
          <div className='btns'>
            <Button onClick={() => console.log('open movie site')}>Watch now</Button>
            <OutlineButton onClick={() => dispatch(openModal(item.id))}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className='hero-slide__item__content__poster'>
          <img src={item.poster_path} alt='' />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  return (
    <Modal id={item.id}>
      <ModalContent>
        <iframe width='100%' height='500px' title='trailer' src={item.src}></iframe>
      </ModalContent>
    </Modal>
  );
};

const Wrapper = styled.div`
  &.hero-slide {
    margin-bottom: 3rem;
  }

  .hero-slide__item {
    padding: 9rem 0;
    width: 100%;
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background-image: linear-gradient(to top, #0f0f0f, rgba(0, 0, 0, 0));
    }

    .hero-slide__item__content {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .hero-slide__item__content__info {
        width: 55%;
        padding: 0 3rem;
        position: relative;

        @media only screen and (max-width: 1024px) {
          width: 100%;
        }

        div:nth-child(n + 2) {
          margin-top: 3rem;
        }

        .title {
          font-size: 5rem;
          font-weight: 700;
          line-height: 1;

          @media only screen and (max-width: 1024px) {
            font-size: 4rem;
          }
        }

        .overview {
          font-weight: 700;
        }

        button:nth-child(n + 2) {
          margin-left: 1rem;
        }

        .btns,
        .title,
        .overview {
          opacity: 0;
          transform: translateY(-100px);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
      }

      .hero-slide__item__content__poster {
        flex: 1 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;

        img {
          width: 400px;
          border-radius: 30px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          transform: translateX(+500px);
          transition: transform 0.7s ease;
        }

        @media only screen and (max-width: 1024px) {
          display: none;
        }
      }
    }

    &.active .hero-slide__item__content__poster {
      img {
        transform: scale(1);
      }
    }

    &.active .hero-slide__item__content__info {
      .btns,
      .title,
      .overview {
        opacity: 1;
        transform: translateY(0);
      }

      .title {
        transition-delay: 0.3s, 0.3s;
      }

      .overview {
        transition-delay: 0.6s, 0.6s;
      }

      .btns {
        transition-delay: 0.9s, 0.9s;
      }
    }
  }
`;

export default HeroSlide;
