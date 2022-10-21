import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { AiFillSetting, AiOutlineDelete, AiFillEdit } from 'react-icons/ai';

import { fetchUserListApi } from '../../services/Admin/userList';
import useFetch from '../../hooks/useFetch';
const UserManagement = () => {
  const { state: user } = useFetch(fetchUserListApi);

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Tài Khoản</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Phân Loại</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mật Khẩu</TableCell>
              <TableCell>
                <AiFillSetting />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              user.map((item) => (
                <TableRow
                  key={item.taiKhoan}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {item.taiKhoan}
                  </TableCell>
                  <TableCell>{item.hoTen}</TableCell>
                  <TableCell>{item.maLoaiNguoiDung}</TableCell>
                  <TableCell>{item.soDT}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.matKhau}</TableCell>
                  <TableCell>
                    <div className='btns-container'>
                      <button
                        className='delete-btn'
                        onClick={() => console.log('delete')}
                      >
                        <AiOutlineDelete /> Xóa
                      </button>
                      <button className='edit-btn' onClick={() => console.log('edit')}>
                        <AiFillEdit /> Sửa
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  svg {
    font-size: 1.2rem;
  }
  .MuiTableCell-head {
    color: var(--primary-yellow);
    font-weight: bold;
    font-size: 1rem;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .btns-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .delete-btn {
    display: flex;
    align-items: center;
    color: var(--primary-red);
  }
  .edit-btn {
    display: flex;
    align-items: center;
    color: var(--primary-blue);
  }
`;

export default UserManagement;
