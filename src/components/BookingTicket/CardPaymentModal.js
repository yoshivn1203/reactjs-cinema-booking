import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from '../../features/uiSlice';
import StripeCheckout from './StripeCheckout';
import payMethods from '../../assets/pay-methods.png';
const CardPaymentModal = ({ handleBooking }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper className='backdrop'>
      <div className='modal__content'>
        <StripeCheckout handleBooking={handleBooking} />
        <div className='modal__content__close' onClick={() => dispatch(closeModal())}>
          <span>x</span>
        </div>
        <div className='pay-methods'>
          <img src={payMethods} alt='' />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);

    .modal__content {
      padding: 2rem;
      background-color: var(--lightest-transparent);
      width: 30%;
      border-radius: 10px;
      transition: transform 0.6s ease, opacity 1s ease;
      position: relative;

      @media only screen and (max-width: 1024px) {
        width: 80%;
      }

      .modal__content__close {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 1.5rem;
        cursor: pointer;
        &:hover {
          color: var(--primary-red);
        }
      }
      .pay-methods {
        width: 40%;
        margin: 0 auto;
        margin-top: 1rem;
      }
    }
  }
`;

export default CardPaymentModal;
