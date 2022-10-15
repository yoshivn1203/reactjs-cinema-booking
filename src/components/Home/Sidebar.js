import React from 'react';
import styled from 'styled-components';

import { FaTimes } from 'react-icons/fa';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar, openSideBar } from '../../features/uiSlice';
import Cinema from './Cinema';
import bg from '../../assets/pattern.png';

const Sidebar = ({ cinemas }) => {
  const { isSideBarOpen } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <button onClick={() => dispatch(openSideBar())} className='sidebar-toggle'>
        <BsFillArrowRightSquareFill />
      </button>
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
    bottom: 5rem;
    left: 1rem;
    z-index: 99;

    font-size: 2.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-yellow);
    transition: all 0.3s linear;
    cursor: pointer;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
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
    position: fixed;
    top: 0;
    left: -160px;
    width: 85rem;
    height: 100%;
    z-index: 99;
    /* background: var(--secondary-gray); */
    background: url(${bg}), rgb(39, 47, 53);
    display: grid;
    grid-template-rows: auto 1fr auto;
    row-gap: 1rem;
    transition: all 0.3s linear;
    transform: translate(-120%) skewX(-15deg);
    .cinema {
      transform: skewX(15deg) translateX(22%);
    }
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
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

export default Sidebar;
