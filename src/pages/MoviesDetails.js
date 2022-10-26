import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import bg from '../assets/snow.jpg';
import casts from '../assets/banner/cast';
import CinemaSelect from '../components/MoviesDetails/CinemaSelect';
import { getMoviesDetails } from '../services/moviesApi';
import useFetch from '../hooks/useFetch';

const MoviesDetails = () => {
  const { id } = useParams();
  const { state: data } = useFetch(getMoviesDetails, id);

  return (
    <>
      {data && (
        <Wrapper>
          <div className='banner' style={{ backgroundImage: `url(${bg})` }}></div>
          <div className='mb-3 movie-content container'>
            <div className='movie-content__poster'>
              <div
                className='movie-content__poster__img'
                style={{ backgroundImage: `url(${data.hinhAnh})` }}
              ></div>
            </div>
            <div className='movie-content__info'>
              <h1 className='title'>{data.tenPhim}</h1>
              <div className='genres'>
                <span className='genres__item'>Phim Đang Chiếu</span>
                <span className='genres__item'>PG-13</span>
              </div>
              <p className='overview'>{data.moTa}</p>
              <div className='cast'>
                <div className='section__header'>
                  <h2>Diễn Viên</h2>
                </div>
                <div className='casts'>
                  {casts.map((cast, i) => (
                    <div key={i} className='casts__item'>
                      <div
                        className='casts__item__img'
                        style={{ backgroundImage: `url(${cast.image})` }}
                      ></div>
                      <p className='casts__item__name'>{cast.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='trailer'>
                <div className='section__header'>
                  <h2>Trailer</h2>
                </div>
                <iframe
                  width='60%'
                  height='300px'
                  title='trailer'
                  src={data.trailer}
                ></iframe>
              </div>
              <CinemaSelect cinemas={data.heThongRapChieu} />
            </div>
          </div>
          <div className='container'></div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  .banner {
    height: 50vh;
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background-image: linear-gradient(to top, #0f0f0f, rgba(#000, 0));
    }
  }

  .movie-content {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 1260px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -200px;
    position: relative;
    padding: 0 2rem;

    .movie-content__poster {
      flex: 1;

      @media only screen and (max-width: 600px) {
        display: none;
      }

      .movie-content__poster__img {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 30px;
        padding-top: 165%;
      }
    }

    .movie-content__info {
      width: 70%;
      padding-left: 2rem;
      position: relative;

      @media only screen and (max-width: 1024px) {
        .trailer {
          iframe {
            width: 100%;
          }
        }
      }

      @media only screen and (max-width: 600px) {
        width: 100%;
        padding-left: 0;
      }

      & > * {
        margin-bottom: 2rem;
      }

      .title {
        font-size: 4rem;
        line-height: 1;
      }

      .genres {
        & > * ~ * {
          margin-left: 0.5rem;
        }

        .genres__item {
          padding: 0.5rem 1.5rem;
          border: 2px solid #fff;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          background-color: var(--primary-black);
        }
      }
    }
  }

  .casts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 1rem;

    .casts__item {
      .casts__item__img {
        padding-top: 160px;
        background-size: cover;
        background-position: center;
        margin-bottom: 0.5rem;
      }

      .casts__item__name {
        font-size: 0.8rem;
        text-transform: capitalize;
      }
    }
  }

  h1 {
    color: var(--primary-yellow);
  }
`;

export default MoviesDetails;
