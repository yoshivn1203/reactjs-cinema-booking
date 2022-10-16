import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { seatActions } from '../../features/seatSlice';
import { MdChair } from 'react-icons/md';
import Timer from './Timer';

const Seats = ({ data }) => {
  const { selectedSeats, selectedVipSeats } = useSelector((state) => state.seat);
  const dispatch = useDispatch();

  //reset seat selection when mounting
  useEffect(() => {
    dispatch(seatActions.reset());
  }, [dispatch]);
  return (
    <Wrapper>
      <div className='Cinema'>
        <Timer />
        <div className='screen' />
        <div className='seats'>
          {data.map((seat) => {
            const isSelected =
              selectedSeats.includes(seat.tenGhe) ||
              selectedVipSeats.includes(seat.tenGhe);
            const isOccupied = seat.daDat;
            const isVip = seat.loaiGhe === 'Vip';
            return (
              <span
                key={seat.tenGhe}
                className={`seat ${
                  isOccupied
                    ? 'occupied'
                    : isVip && !isSelected
                    ? 'vip'
                    : isSelected
                    ? 'selected'
                    : ''
                }`}
                onClick={isOccupied ? null : () => dispatch(seatActions.selecting(seat))}
              >
                <MdChair />
              </span>
            );
          })}
        </div>
      </div>
      <ul className='ShowCase'>
        <li>
          <MdChair className='seat' /> <small>Ghế Trống</small>
        </li>
        <li>
          <MdChair className='seat vip' /> <small>Ghế Vip</small>
        </li>
        <li>
          <MdChair className='seat selected' /> <small>Ghế Đang Chọn</small>
        </li>
        <li>
          <MdChair className='seat occupied' /> <small>Ghế Đã Được Đặt Trước</small>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--primary-transparent);
  border-radius: var(--primary-borderRadius);
  box-shadow: var(--primary-boxShadow);
  width: 50rem;

  .Cinema {
    perspective: 400px;
    width: 100%;
    display: grid;
    justify-items: center;
    padding-top: 1rem;
    margin-top: 1rem;
    grid-gap: 24px;
    .screen {
      height: 40px;
      max-width: 38rem;
      background: var(--primary-white);
      width: 100%;
      transform: rotateX(-60deg) scale(1.1);
      box-shadow: 0 3px 15px 5px;
      filter: drop-shadow(4px 25px 20px rgba(255, 255, 255, 0.5));
      margin-top: 0.5rem;
      margin-bottom: 2rem;
    }
    .seats {
      display: grid;
      grid-gap: 0.75rem;
      grid-template-columns: repeat(16, min-content);
      align-items: center;

      .seat:not(.occupied):hover,
      .seat:not(.occupied):focus {
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }

  .ShowCase {
    margin-top: 3rem;
    margin-bottom: 2rem;
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0.75rem;
    font-size: 1rem;
    li {
      margin: 0 12px;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  }
  .seat {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.3s ease-in-out;
    position: relative;
    top: 1px;
    &.selected {
      color: var(--secondary-blue) !important;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        background: transparent;
        border: 1px solid var(--secondary-blue);
        animation: show-off 0.8s;
        visibility: hidden;
      }
    }
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    &.occupied {
      color: var(--primary-gray);
    }
    &.seat.vip {
      color: var(--primary-yellow);
    }
  }

  @keyframes show-off {
    0% {
      transform: scale(1);
      opacity: 1;
      visibility: visible;
    }

    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @media screen and (max-width: 1399px) {
    width: 40rem;
    .Cinema {
      grid-gap: 1rem;
      .screen {
        max-width: 31rem;
      }
      .seat {
        width: 1.5rem;
        height: 1rem;
        &.selected::after {
          width: 1.5rem;
          height: 1.5rem;
        }
        svg {
          width: 1.5rem;
          height: 1rem;
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 37rem;
    .Cinema {
      .screen {
        max-width: 30rem;
      }
    }
  }
`;

export default Seats;
