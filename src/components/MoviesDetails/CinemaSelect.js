import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import Button from '../UI/Button';

const CinemaSelect = ({ cinemas }) => {
  const [selectedCinema, SetSelectedCinema] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const navigate = useNavigate();

  const locations = cinemas?.find((c) => c.maHeThongRap === selectedCinema)?.cumRapChieu;
  const showTime = locations?.find((l) => l.maCumRap === selectedLocation)?.lichChieuPhim;
  //   console.log(cinemas);

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
                    {moment(m.ngayChieuGioChieu).format('LLL')}
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
    </>
  );
};

export default CinemaSelect;
