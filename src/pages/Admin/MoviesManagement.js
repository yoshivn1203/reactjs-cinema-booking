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
import { useNavigate } from 'react-router-dom';
import {
  AiFillSetting,
  AiTwotoneDelete,
  AiFillEdit,
  AiOutlinePlusCircle,
  AiFillSchedule,
} from 'react-icons/ai';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import {
  deleteMovieApi,
  fetchMoviesListApi,
  fetchSearchMoviesApi,
} from '../../services/Admin/adminMoviesApi';
import { shortenString } from '../../utils/shortenString';
import { formatShortDate } from '../../utils/formatDate';

const MoviesManagement = () => {
  const [movies, setMovies] = useState();
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
      await deleteMovieApi(taiKhoan);
      searchValue.trim() === '' ? fetchList() : fetchSearch();
      toast('✔️ Xóa phim thành công');
    } catch (error) {
      toast.error('Lỗi, xin vui lòng thử lại sau');
      console.log(error);
    }
  };

  const fetchList = useCallback(async () => {
    const result = await fetchMoviesListApi(page, rowsPerPage);
    setMovies(result.data.content);
  }, [page, rowsPerPage]);

  const fetchSearch = useCallback(async () => {
    const result = await fetchSearchMoviesApi(page, rowsPerPage, searchValue);
    setMovies(result.data.content);
  }, [page, rowsPerPage, searchValue]);

  useEffect(() => {
    searchValue.trim() === '' ? fetchList() : fetchSearch();
  }, [fetchList, fetchSearch, searchValue]);

  if (!movies) return <LoadingSpinner />;

  return (
    <Wrapper>
      <h3>Danh Sách Phim</h3>
      <div className='action'>
        <TextField
          id='standard-basic'
          label='Tìm theo tên phim'
          variant='standard'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: '40%', paddingBottom: '1rem' }}
        />

        <Button
          color='warning'
          variant='contained'
          sx={{ mb: 2 }}
          onClick={() => navigate('/admin/add-edit-movie')}
        >
          <AiOutlinePlusCircle /> Thêm Phim
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Mã Phim</TableCell>
              <TableCell>Tên Phim</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Khởi Chiếu</TableCell>
              <TableCell>
                <AiFillSetting />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.items.map((item) => (
              <TableRow
                key={item.maPhim}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.maPhim}
                </TableCell>
                <TableCell sx={{ width: 300 }}>{item.tenPhim}</TableCell>
                <TableCell>
                  <img src={item.hinhAnh} alt='phim' />
                </TableCell>
                <TableCell sx={{ width: 500 }}>{shortenString(item.moTa, 150)}</TableCell>
                <TableCell>{formatShortDate(item.ngayKhoiChieu)}</TableCell>
                <TableCell>
                  <div className='btns-container'>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(item.maPhim)}
                    >
                      <AiTwotoneDelete /> Xóa
                    </button>
                    <button
                      className='edit-btn'
                      onClick={() => navigate('/admin/add-edit-movie', { state: item })}
                    >
                      <AiFillEdit /> Sửa
                    </button>
                    <button
                      className='showtime-btn'
                      onClick={() =>
                        navigate('/admin/add-showtime', { state: item.maPhim })
                      }
                    >
                      <AiFillSchedule />
                      Lịch Chiếu
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={movies.totalCount}
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
  img {
    width: 100px;
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
    color: var(--secondary-red);
  }
  .edit-btn {
    color: var(--secondary-blue);
  }
  .showtime-btn {
    color: var(--primary-green);
  }
`;

export default MoviesManagement;
