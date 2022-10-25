import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {
  fetchCinemaGroupListApi,
  fetchCinemaListApi,
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

const AddShowTime = () => {
  const { state: maPhim } = useLocation();
  const { state: cinemaList } = useFetch(fetchCinemaListApi);
  const [selectedCimena, setSelectedCinema] = useState('BHDStar');
  const [locations, setLocations] = useState();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [date, setDate] = useState('2022-11-12T21:11:54');
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchCinemaGroup = async () => {
      const result = await fetchCinemaGroupListApi(selectedCimena);
      setLocations(result.data.content);
      console.log(result.data.content);
    };
    if (selectedCimena) {
      fetchCinemaGroup();
    }
  }, [selectedCimena]);

  useEffect(() => {
    locations && setSelectedLocation(locations[0].maCumRap);
    // eslint-disable-next-line
  }, [locations]);

  return (
    <div className=' mb-3'>
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
      <div style={{ marginTop: '2rem' }}>
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
            label='Basic example'
            value={time}
            onChange={(newValue) => {
              setTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default AddShowTime;
