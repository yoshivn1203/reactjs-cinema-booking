import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { BsPersonFill, BsFillBugFill, BsChevronDown } from 'react-icons/bs';
import { RiMovieFill } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import { AiFillSchedule } from 'react-icons/ai';

const items = [
  {
    title: 'Tài Khoản',
    icon: <BsPersonFill />,
    path: '/admin',
  },
  {
    title: 'Phim',
    icon: <RiMovieFill />,
    childrens: [
      {
        title: 'Quản Lý Phim',
        path: '/login',
      },
      {
        title: 'Thêm Phim Mới',
        path: '/login',
      },
    ],
  },

  {
    title: 'Lịch Chiếu',
    icon: <AiFillSchedule />,
    path: '/admin',
  },
  {
    title: 'Hỗ Trợ',
    icon: <BiSupport />,
    path: '/admin',
  },
  {
    title: 'Báo Cáo Lỗi',
    icon: <BsFillBugFill />,
    path: '/admin',
  },
];

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
        <div className='sidebar-title'>
          <div className='icon-container'>
            {item.icon}
            {item.title}
          </div>
          <BsChevronDown className='toggle-btn' onClick={() => setOpen(!open)} />
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
      <NavLink to={item.path || '/'} className='sidebar-item plain'>
        {item.icon}
        {item.title}
      </NavLink>
    );
  }
};

export default function AdminLayout() {
  return (
    <Wrapper className='main'>
      <div className='sidebar'>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &.main {
    display: flex;
    height: 100vh;
    .content {
      flex-grow: 1;
      padding: 2em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
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
      width: 260px;
      flex-shrink: 0;
      background-color: rgba(22, 22, 22, 1);
      height: 100%;
      overflow: auto;
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
      height: 0;
      overflow: hidden;
    }
    .sidebar-item.open > .sidebar-content {
      height: auto;
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
  }
`;
