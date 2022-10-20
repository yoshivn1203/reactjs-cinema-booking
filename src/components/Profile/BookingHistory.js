import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import formatDate from '../../utils/formatDate';
export default function BookingHistory({ userInfo }) {
  // console.log(userInfo.thongTinDatVe);

  const history = userInfo.thongTinDatVe.map((item) => {
    const { maVe, tenPhim, ngayDat, danhSachGhe } = item;
    const listGhe = danhSachGhe.reduce((list, item) => {
      list.push(item.tenGhe);
      return list;
    }, []);
    return {
      maVe,
      tenPhim,
      ngayDat,
      Rap: danhSachGhe[0].tenHeThongRap,
      listGhe,
    };
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Mã Vé</TableCell>
            <TableCell>Tên Phim</TableCell>
            <TableCell>Rạp</TableCell>
            <TableCell>Ngày Đặt</TableCell>
            <TableCell>Số Ghế</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item) => (
            <TableRow
              key={item.maVe}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {item.maVe}
              </TableCell>
              <TableCell>{item.tenPhim}</TableCell>
              <TableCell>{item.Rap}</TableCell>
              <TableCell>{formatDate(item.ngayDat)}</TableCell>
              <TableCell>{item.listGhe.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
