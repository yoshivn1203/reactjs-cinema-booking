import React from 'react';
import styled from 'styled-components';

import { FaTimes } from 'react-icons/fa';
import { GiClick } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar, openSideBar } from '../features/uiSlice';
import Cinema from '../components/Home/Cinema';

const Sidebar = ({ cinemas }) => {
  const { isSideBarOpen } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <button onClick={() => dispatch(openSideBar())} className='sidebar-toggle'>
        <GiClick />
      </button>
      <aside className={`${isSideBarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className='sidebar-header'>
          {/* <img src={logo} className='logo' alt='coding addict' /> */}
          <button className='close-btn' onClick={() => dispatch(closeSideBar())}>
            <FaTimes />
          </button>
        </div>
        <Cinema cinemas={cinemas} />
      </aside>
      {isSideBarOpen && <div className='backdrop'></div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sidebar-toggle {
    position: fixed;
    top: 15rem;
    left: 1rem;
    z-index: 99;

    font-size: 2rem;
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
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 1.75rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-red);
    cursor: pointer;
    margin-top: 0.2rem;
  }

  li {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--primary-yellow);
    transition: all 0.3s linear;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: var(--secondary-gray);
    display: grid;
    grid-template-rows: auto 1fr auto;
    row-gap: 1rem;
    transition: all 0.3s linear;
    transform: translate(-100%);
  }
  .show-sidebar {
    transform: translate(0);
  }
  @media screen and (min-width: 676px) {
    .sidebar {
      width: 800px;
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
