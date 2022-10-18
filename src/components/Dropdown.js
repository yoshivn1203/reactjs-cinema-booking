import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {`Hi ${userInfo.taiKhoan}`} <MdOutlineArrowDropDown />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
        <MenuItem onClick={handleClose}>Lịch sử đặt vé</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
      </Menu>
    </div>
  );
}
