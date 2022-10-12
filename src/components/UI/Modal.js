import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';

import styled from 'styled-components';

const Modal = (props) => {
  const { isModalOpen, modalId } = useSelector((store) => store.Ui);
  return (
    <Wrapper
      id={props.id}
      className={`modal ${isModalOpen && props.id === modalId ? 'active' : ''}`}
    >
      {props.children}
    </Wrapper>
  );
};

export const ModalContent = (props) => {
  const dispatch = useDispatch();

  return (
    <div className='modal__content'>
      {props.children}
      <div className='modal__content__close' onClick={() => dispatch(closeModal())}>
        <span>x</span>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  &.modal {
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
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    visibility: hidden;
    &.active {
      opacity: 1;
      visibility: visible;
    }
    .modal__content {
      padding: 2rem;
      background-color: #0f0f0f;
      width: 50%;
      opacity: 0;
      transform: translateY(-250px);
      transition: transform 0.6s ease, opacity 0.6s ease;
      position: relative;

      @media only screen and (max-width: 1024px) {
        width: 80%;
      }

      .modal__content__close {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 1.5rem;
        cursor: pointer;
        &:hover {
          color: #ff0000;
        }
      }
    }

    &.active .modal__content {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Modal;
