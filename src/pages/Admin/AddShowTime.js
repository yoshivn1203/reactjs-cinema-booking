import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {
  fetchCinemaGroupListApi,
  fetchCinemaListApi,
  createTimeApi,
} from '../../services/Admin/adminMoviesApi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../components/UI/Button';
import { useDispatch } from 'react-redux';
import { finishLoading, loading } from '../../features/uiSlice';
import ShowTimeTable from '../../components/AddShowTime/ShowTimeTable';

const AddShowTime = () => {
  const {
    state: { maPhim, tenPhim },
  } = useLocation();
  const { state: cinemaList } = useFetch(fetchCinemaListApi);
  const [selectedCimena, setSelectedCinema] = useState('BHDStar');
  const [locations, setLocations] = useState();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [date, setDate] = useState('2022-11-12T21:00:00');
  const [time, setTime] = useState('2022-11-12T21:00:00');
  const [triggerRerender, setTriggerRerender] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCinemaGroup = async () => {
      const result = await fetchCinemaGroupListApi(selectedCimena);
      setLocations(result.data.content);
    };
    if (selectedCimena) {
      fetchCinemaGroup();
    }
  }, [selectedCimena]);

  useEffect(() => {
    locations && setSelectedLocation(locations[0].maCumRap);
    // eslint-disable-next-line
  }, [locations]);

  const HandleSubmit = async () => {
    const ngayChieuGioChieu = `${moment(date).format('DD/MM/YYYY')} ${moment(time).format(
      'hh:mm:ss'
    )}`;
    const submitData = {
      maPhim,
      ngayChieuGioChieu,
      maRap: selectedLocation,
      giaVe: 75000,
    };
    try {
      dispatch(loading());
      await createTimeApi(submitData);
      toast('✔️ Thêm phim thành công');
      dispatch(finishLoading());
      setTriggerRerender(!triggerRerender);
    } catch (error) {
      toast.error('Lỗi xin vui lòng thử lại sau');
      dispatch(finishLoading());
    }
  };
  if (!maPhim) {
    return <h2>Đường dẫn không hợp lệ</h2>;
  }

  return (
    <Wrapper>
      <h3>Thêm Lịch Chiếu</h3>
      <div className='showtime-info'>
        <h4>Tên Phim: {tenPhim}</h4>
        <div className='select-lists'>
          {cinemaList && (
            <FormControl variant='standard' sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id='cinema-label'>Hệ Thống Rạp</InputLabel>
              <Select
                labelId='cinema-label'
                id='cinema-select'
                value={selectedCimena}
                onChange={(e) => setSelectedCinema(e.target.value)}
                label='Cinema'
              >
                {cinemaList.map((c) => {
                  return (
                    <MenuItem key={c.maHeThongRap} value={c.maHeThongRap}>
                      {c.tenHeThongRap}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          {locations && (
            <FormControl variant='standard' sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id='location-label'>Cụm Rạp</InputLabel>
              <Select
                labelId='location-label'
                id='location-select'
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label='location'
              >
                {locations.map((l) => {
                  return (
                    <MenuItem key={l.maCumRap} value={l.maCumRap}>
                      {l.tenCumRap}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label='Chọn ngày'
              inputFormat='DD/MM/YYYY'
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              label='Chọn Giờ'
              value={time}
              onChange={(newValue) => {
                setTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className='submit-btn-container'>
          <Button type='button' className='medium' onClick={HandleSubmit}>
            Thêm Lịch Chiếu
          </Button>
        </div>
      </div>
      <h3>Lịch Chiếu Hiện Tại</h3>
      <ShowTimeTable maPhim={maPhim} flag={triggerRerender} />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  h3 {
    color: var(--primary-yellow);
    margin-bottom: 1rem;
  }
  .showtime-info {
    background-color: var(--admin-gray);
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 3rem;
  }
  .select-lists {
    margin: 2rem auto;
    display: flex;
    justify-content: space-around;
  }
  .submit-btn-container {
    display: flex;
    justify-content: end;
    margin-right: 3rem;
  }
`;

export default AddShowTime;
