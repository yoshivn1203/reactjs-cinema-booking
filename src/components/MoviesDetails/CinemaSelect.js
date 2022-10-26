import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OutlineButton } from '../UI/Button';
import { formatDateButton } from '../../utils/formatDate';
import styled from 'styled-components';
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
          <Typography component={'span'}>{children}</Typography>
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
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const locations = cinemas?.find((c) => c.maHeThongRap === selectedCinema)?.cumRapChieu;
  // console.log(locations);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (cinemas?.length > 0) {
      SetSelectedCinema(cinemas[0].maHeThongRap);
    }
  }, [cinemas]);

  return (
    <Wrapper>
      {cinemas?.length > 0 ? (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              {cinemas?.map((c, i) => {
                return (
                  <Tab
                    key={c.maHeThongRap}
                    icon={<img src={c.logo} alt='' />}
                    {...a11yProps(i)}
                    style={{ minWidth: 50 }}
                    onClick={() => SetSelectedCinema(c.maHeThongRap)}
                  />
                );
              })}
            </Tabs>
          </Box>
          {cinemas?.map((c, i) => {
            return (
              <TabPanel key={c.maHeThongRap} value={value} index={i}>
                {locations?.map((l) => {
                  return (
                    <div key={l.maCumRap} className='cinema-card'>
                      <h3>{l.tenCumRap}</h3>
                      <p>{l.diaChi}</p>
                      <h5>Chọn suất chiếu:</h5>
                      <div className='btn-container'>
                        {l.lichChieuPhim.map((q) => {
                          return (
                            <OutlineButton
                              key={q.maLichChieu}
                              className='small'
                              onClick={() => navigate(`/showTime/${q.maLichChieu}`)}
                            >
                              {formatDateButton(q.ngayChieuGioChieu)}
                            </OutlineButton>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </TabPanel>
            );
          })}
        </Box>
      ) : (
        <h3>Xin lỗi, hiện chưa có lịch chiếu cho phim này</h3>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .MuiBox-root {
    img {
      width: 4rem;
    }
  }
  @media only screen and (max-width: 800px) {
    .MuiBox-root {
      img {
        width: 3rem;
      }
    }
  }
  .cinema-card {
    background-color: var(--secondary-black);
    border-radius: 10px;
    h3 {
      color: var(--primary-yellow);
    }
    p {
      color: var(--light-gray);
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    padding: 1rem;
    margin-bottom: 1rem;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .btn-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 6rem);
    gap: 1rem;
    padding-top: 0.5rem;
    button {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

export default CinemaSelect;
