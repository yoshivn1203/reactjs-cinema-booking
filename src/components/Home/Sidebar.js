import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar, openSideBar } from '../../features/uiSlice';
import Cinema from './Cinema';
import bg from '../../assets/pattern.png';
import ticket from '../../assets/ticket-edited.png';

const Sidebar = ({ cinemas }) => {
  const { isSideBarOpen } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  const ticketRef = useRef(null);

  useEffect(() => {
    const showTicket = () => {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        ticketRef.current.classList.add('show');
      } else {
        ticketRef.current.classList.remove('show');
      }
    };
    window.addEventListener('scroll', showTicket);
    return () => {
      window.removeEventListener('scroll', showTicket);
    };
  }, []);

  return (
    <Wrapper>
      <div ref={ticketRef} className='sidebar-toggle'>
        <img onClick={() => dispatch(openSideBar())} src={ticket} alt='' />
      </div>
      <aside className={`${isSideBarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className='sidebar-header'>
          <button className='close-btn' onClick={() => dispatch(closeSideBar())}>
            <FaTimes />
          </button>
        </div>
        <div className='cinema'>
          <Cinema cinemas={cinemas} />
        </div>
      </aside>
      {isSideBarOpen && <div className='backdrop'></div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sidebar-toggle {
    position: fixed;
    bottom: 6rem;
    left: 1rem;
    z-index: 99;
    /* font-size: 2.5rem; */
    width: 5rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-yellow);
    transition: all 0.3s linear;
    cursor: pointer;
    animation: jump 2s ease-in-out infinite;
    display: none;
    visibility: hidden;
    &.show {
      display: block;
      visibility: visible;
    }
  }

  @keyframes jump {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(15%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  .sidebar-header {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 1rem 0;
    padding-left: 8rem;
  }
  .close-btn {
    font-size: 1.75rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-red);
    cursor: pointer;
    margin-top: 0.2rem;
    transform: skewX(15deg);
  }

  .sidebar {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: -160px;
    width: 85rem;
    height: 100%;
    z-index: 99;
    background: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    display: grid;
    grid-template-rows: auto 1fr auto;
    row-gap: 1rem;
    transition: all 0.3s linear;
    transform: translate(-120%) skewX(-15deg);
    .cinema {
      transform: skewX(15deg) translateX(22%);
    }
  }
  .sidebar:before {
    content: '';
    position: absolute;
    width: 120%;
    height: 100%;
    top: 0;
    left: 0%;
    background: url(${bg});
    opacity: 0.3;
    transform: skewX(15deg);
  }
  .show-sidebar {
    transform: translate(0) skewX(-15deg);
  }
  @media screen and (min-width: 1024px) {
    .sidebar-header {
      padding-left: 5rem;
    }
    .sidebar {
      width: 60rem;
    }
  }
  .backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 98;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
  }
`;

export default Sidebar;
