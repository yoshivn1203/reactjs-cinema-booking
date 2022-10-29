import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';

export default function BasicMenu({ userInfo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Wrapper>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={avatar} alt='' /> {userInfo.taiKhoan} <MdOutlineArrowDropDown />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {userInfo.maLoaiNguoiDung === 'QuanTri' && (
          <MenuItem
            onClick={() => {
              navigate('/admin');
              setAnchorEl(null);
            }}
          >
            Quản Trị
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            navigate('/profile');
            setAnchorEl(null);
          }}
        >
          Hồ Sơ Cá Nhân
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logoutUser());
            navigate('/');
          }}
        >
          Đăng Xuất
        </MenuItem>
      </Menu>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  img {
    width: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`;
