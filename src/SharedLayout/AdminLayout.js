import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsPersonFill, BsChevronDown, BsFillBugFill } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { RiMovieFill } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';
import logo from '../assets/logo3.png';
import { RiMenu2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { OutlineButton } from '../components/UI/Button';

const items = [
  {
    title: 'Tài Khoản',
    icon: <BsPersonFill />,
    childrens: [
      {
        title: 'Danh Sách Tài Khoản',
        path: '/admin',
      },
      {
        title: 'Thêm / Sửa Tài Khoản',
        path: 'add-edit-user',
      },
    ],
  },
  {
    title: 'Phim',
    icon: <RiMovieFill />,
    childrens: [
      {
        title: 'Danh Sách Phim',
        path: 'movies-management',
      },
      {
        title: 'Thêm / Sửa Phim',
        path: 'add-edit-movie',
      },
    ],
  },
  {
    title: 'Lịch Chiếu',
    icon: <AiFillSchedule />,
    path: 'add-showtime',
  },

  {
    title: 'Hỗ Trợ',
    icon: <BiSupport />,
    path: 'support',
  },
  {
    title: 'Báo Cáo Lỗi',
    icon: <BsFillBugFill />,
    path: 'report-bug',
  },
];

const SidebarItem = ({ item }) => {
  const [openSubmenu, SetOpenSubmenu] = useState(true);

  if (item.childrens) {
    return (
      <div className={openSubmenu ? 'sidebar-item open' : 'sidebar-item'}>
        <div className='sidebar-title'>
          <div className='icon-container'>
            {item.icon}
            {item.title}
          </div>
          <BsChevronDown
            className='toggle-btn'
            onClick={() => SetOpenSubmenu(!openSubmenu)}
          />
        </div>
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        to={item.path || '#'}
        className={({ isActive }) => {
          return isActive ? 'sidebar-item plain active' : 'sidebar-item plain';
        }}
        end
      >
        {item.icon}
        {item.title}
      </NavLink>
    );
  }
};
export default function AdminLayout() {
  const [openSidebar, SetOpenSidebar] = useState(true);
  const { userInfo } = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className={`sidebar ${openSidebar ? 'open' : ''}`}>
        <div className='logo'>
          <img src={logo} alt='' />
          Cyber
        </div>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
        <div className='btn-container'>
          <OutlineButton className='small' onClick={() => navigate('/')}>
            Về Trang Chủ
          </OutlineButton>
        </div>
      </div>
      <div className='main'>
        <div className='navbar'>
          <button className='btn' onClick={() => SetOpenSidebar(!openSidebar)}>
            <RiMenu2Fill />
          </button>
          <h2>Dashboard</h2>
          <h3>Hello {userInfo.taiKhoan}</h3>
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  .main {
    width: 100%;
  }

  .title {
    font-size: 3em;
  }
  .info {
    font-size: 1.1em;
    letter-spacing: 1px;
    line-height: 1.5;
    margin: 1.5em;
    color: rgb(224, 224, 224);
  }

  .sidebar {
    z-index: 1;
    min-height: 100vh;
    height: 100%;
    width: 16rem;
    flex-shrink: 0;

    background-color: var(--admin-gray);
    height: 100%;
    overflow: auto;
    transition: all 0.3s linear;
    margin-left: -16rem;
    .logo {
      font-size: 2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      padding: 1rem;

      img {
        margin-right: 10px;
        width: 50px;

        @media only screen and (max-width: 600px) {
          width: 30px;
          margin-right: 0;
        }
      }
    }
  }
  .sidebar.open {
    margin-left: 0;
  }

  .sidebar-item {
    padding: 0.75em 1em;
    display: block;
    transition: background-color 0.15s;
    border-radius: 5px;
    .icon-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    svg {
      font-size: 1.2rem;
    }
  }
  .sidebar-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .sidebar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sidebar-title span i {
    display: inline-block;
    width: 1.5em;
  }
  .sidebar-title .toggle-btn {
    cursor: pointer;
    transition: transform 0.3s;
  }
  .sidebar-item.open > .sidebar-title .toggle-btn {
    transform: rotate(180deg);
  }
  .sidebar-content {
    padding-top: 0.25em;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s linear;
  }
  .sidebar-item.open > .sidebar-content {
    max-height: 200px; //change this value and the timer to get desired speed of transition
  }

  .sidebar-item.plain {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    text-decoration: none;
  }
  .sidebar-item.plain:hover {
    text-decoration: underline;
  }
  .sidebar-item.active {
    color: var(--primary-yellow);
    font-weight: bold;
    text-decoration: underline;
  }
  .btn-container {
    margin-top: 10rem;
    text-align: center;
  }

  .navbar {
    width: 100%;
    height: 5rem;
    background-color: var(--admin-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .btn {
      svg {
        font-size: 2rem;
      }
      color: white;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .content {
    padding: 1.5rem;
  }
`;
