import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import 'moment/locale/vi';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
  console.log(history);
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
              <TableCell>{moment(item.ngayDat).format('LLL')}</TableCell>
              <TableCell>{item.listGhe.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
