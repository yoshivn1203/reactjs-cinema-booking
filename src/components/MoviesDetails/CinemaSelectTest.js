import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import formatDate from '../../utils/formatDate';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CinemaSelect = ({ cinemas }) => {
  const [selectedCinema, SetSelectedCinema] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const locations = cinemas?.find((c) => c.maHeThongRap === selectedCinema)?.cumRapChieu;
  const showTime = locations?.find((l) => l.maCumRap === selectedLocation)?.lichChieuPhim;
  console.log(locations);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (cinemas?.length > 0) {
      SetSelectedCinema(cinemas[0].maHeThongRap);
    }
  }, [cinemas]);

  useEffect(() => {
    locations && setSelectedLocation(locations[0].maCumRap);
    showTime && setSelectedShowTime(showTime[0].maLichChieu);
    // eslint-disable-next-line
  }, [selectedCinema]);
  useEffect(() => {
    showTime && setSelectedShowTime(showTime[0].maLichChieu);
    // eslint-disable-next-line
  }, [selectedLocation]);

  return (
    <>
      {cinemas?.length > 0 ? (
        <div className='mb-3'>
          <h2 className='mb-2'>Đặt Vé</h2>
          <div className='form-select mb-2'>
            <h3>Hệ Thống Rạp</h3>
            <select
              name='cinema'
              value={selectedCinema}
              onChange={(e) => SetSelectedCinema(e.target.value)}
              className='cinema'
            >
              {cinemas?.map((m) => {
                return (
                  <option key={m.maHeThongRap} value={m.maHeThongRap}>
                    {m.tenHeThongRap}
                  </option>
                );
              })}
            </select>
            <h3>Cụm Rạp</h3>
            <select
              name='locations'
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className='locations'
            >
              {locations?.map((m) => {
                return (
                  <option key={m.maCumRap} value={m.maCumRap}>
                    {m.tenCumRap}
                  </option>
                );
              })}
            </select>
            <h3>Lịch Chiếu</h3>
            <select
              name='showTime'
              value={selectedShowTime}
              onChange={(e) => setSelectedShowTime(e.target.value)}
              className='showTime'
            >
              {showTime?.map((m) => {
                return (
                  <option key={m.maLichChieu} value={m.maLichChieu}>
                    {formatDate(m.ngayChieuGioChieu)}
                  </option>
                );
              })}
            </select>
          </div>
          <Button
            className='medium'
            onClick={() => navigate(`/showTime/${selectedShowTime}`)}
          >
            Đặt Vé
          </Button>
        </div>
      ) : (
        <h3>Chưa có lịch chiếu cho phim này</h3>
      )}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            {cinemas?.map((c, i) => {
              return (
                <Tab
                  key={c.maHeThongRap}
                  icon={<img src={c.logo} alt='' />}
                  {...a11yProps(i)}
                  onClick={() => SetSelectedCinema(c.maHeThongRap)}
                />
              );
            })}
          </Tabs>
        </Box>
        {cinemas?.map((c, i) => {
          return (
            <TabPanel key={c.maHeThongRap} value={value} index={i}>
              {locations?.map((l, i) => {
                return (
                  <>
                    <p>{l.tenCumRap}</p>
                    {l.lichChieuPhim.map((q, i) => {
                      return (
                        <button onClick={() => navigate(`/showTime/${q.maLichChieu}`)}>
                          {moment(q.ngayChieuGioChieu).format('ddd - HH:MM')}
                        </button>
                      );
                    })}
                  </>
                );
              })}
            </TabPanel>
          );
        })}
      </Box>
    </>
  );
};

export default CinemaSelect;
