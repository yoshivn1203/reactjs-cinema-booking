import { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import {
  AiFillSetting,
  AiTwotoneDelete,
  AiFillEdit,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import {
  fetchSearchUserApi,
  fetchUserListApi,
  deleteUserApi,
} from '../../services/Admin/userList';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [user, setUser] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (taiKhoan) => {
    try {
      await deleteUserApi(taiKhoan);
      searchValue.trim() === '' ? fetchList() : fetchSearch();
      toast('✔️ Xóa tài khoản thành công');
    } catch (error) {
      toast.error('Lỗi, xin vui lòng thử lại sau');
      console.log(error);
    }
  };

  const fetchList = useCallback(async () => {
    const result = await fetchUserListApi(page, rowsPerPage);
    setUser(result.data.content);
  }, [page, rowsPerPage]);

  const fetchSearch = useCallback(async () => {
    const result = await fetchSearchUserApi(page, rowsPerPage, searchValue);
    setUser(result.data.content);
  }, [page, rowsPerPage, searchValue]);

  useEffect(() => {
    searchValue.trim() === '' ? fetchList() : fetchSearch();
  }, [fetchList, fetchSearch, searchValue]);

  if (!user) return <LoadingSpinner />;

  return (
    <Wrapper>
      <h3>Quản Lý Tài Khoản</h3>
      <div className='action'>
        <TextField
          id='standard-basic'
          label='Tìm theo họ tên'
          variant='standard'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: '40%', paddingBottom: '1rem' }}
        />

        <Button
          color='warning'
          variant='contained'
          sx={{ mb: 2 }}
          onClick={() => navigate('add-edit-user')}
        >
          <AiOutlinePlusCircle /> Thêm Tài Khoản
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Tài Khoản</TableCell>
              <TableCell>Họ Tên</TableCell>
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
            {user.items.map((item) => (
              <TableRow
                key={item.taiKhoan}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.taiKhoan}
                </TableCell>
                <TableCell>{item.hoTen}</TableCell>
                <TableCell>{item.maLoaiNguoiDung}</TableCell>
                <TableCell>{item.soDt}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.matKhau}</TableCell>
                <TableCell>
                  <div className='btns-container'>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(item.taiKhoan)}
                    >
                      <AiTwotoneDelete /> Xóa
                    </button>
                    <button
                      className='edit-btn'
                      onClick={() => navigate('add-edit-user', { state: item })}
                    >
                      <AiFillEdit /> Sửa
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={user.totalCount}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'Số hàng mỗi trang'}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ paddingTop: '2rem' }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  h3 {
    color: var(--primary-yellow);
    margin-bottom: 1rem;
  }
  .action {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  svg {
    font-size: 1.2rem;
    margin-right: 0.3rem;
  }

  .MuiTableCell-head {
    color: var(--primary-yellow);
    font-weight: bold;
    font-size: 1rem;
  }
  .MuiTableBody-root .MuiTableRow-root:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .btns-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
  .delete-btn {
    color: var(--primary-red);
  }
  .edit-btn {
    color: var(--primary-blue);
  }
`;

export default UserManagement;
