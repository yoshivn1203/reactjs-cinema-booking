import React, { useEffect, useState } from 'react';
import { getMoviesDetails } from '../../services/moviesApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { finishLoading, loading } from '../../features/uiSlice';
import formatDate from '../../utils/formatDate';

const ShowTimeTable = ({ maPhim, flag }) => {
  const [state, setState] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(loading());
        const result = await getMoviesDetails(maPhim);
        setState(result.data.content);
        dispatch(finishLoading());
      } catch (error) {
        dispatch(finishLoading());
      }
    };
    fetchData();
  }, [maPhim, flag, dispatch]);

  const renderData = (state) => {
    const tableData = state.heThongRapChieu.reduce((total, heThong) => {
      heThong.cumRapChieu.forEach((c) => {
        c.lichChieuPhim.forEach((l) => {
          total.push({
            maLichChieu: l.maLichChieu,
            tenCumRap: c.tenCumRap,
            diaChi: c.diaChi,
            thoiGian: l.ngayChieuGioChieu,
          });
        });
      });
      return total;
    }, []);
    // console.log(tableData);
    return (
      <TableContainer component={Paper} style={{ maxHeight: 800 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Mã Lịch Chiếu</TableCell>
              <TableCell>Tên Cụm Rạp</TableCell>
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Thời Gian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.maLichChieu}>
                <TableCell component='th' scope='row'>
                  {row.maLichChieu}
                </TableCell>
                <TableCell>{row.tenCumRap}</TableCell>
                <TableCell>{row.diaChi}</TableCell>
                <TableCell>{formatDate(row.thoiGian)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  // console.log(state?.heThongRapChieu);

  return <>{state && renderData(state)}</>;
};

export default ShowTimeTable;
