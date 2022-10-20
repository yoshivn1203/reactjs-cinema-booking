import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const format = (time) => {
  const date = new Date(time * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  if (hh < 10) {
    hh = '0' + hh;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (ss < 10) {
    ss = '0' + ss;
  }
  return '00' !== hh ? hh + ':' + mm + ':' + ss : mm + ':' + ss;
};

const defaultTime = 5 * 60;

const Timer = () => {
  const [time, setTime] = useState(defaultTime);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    if (time === 0) {
      toast.error('Hết thời gian giữ ghế, quay về trang chủ');
      navigate('/');
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, navigate]);

  return (
    <div className='container'>
      <h4>Thời gian giữ ghế</h4>
      <h3 style={{ color: 'var(--primary-yellow)' }}>{format(time)}</h3>
    </div>
  );
};

export default Timer;
