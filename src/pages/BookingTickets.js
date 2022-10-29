import React, { useState } from 'react';
import styled from 'styled-components';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FaCcVisa } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { seatActions } from '../features/seatSlice';
import bg from '../assets/jungle-compressed.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import Seats from '../components/BookingTicket/Seats';
import BookingInfo from '../components/BookingTicket/BookingInfo';
import { getTicketRoomInfo, bookingMovie } from '../services/moviesApi';
import useFetch from '../hooks/useFetch';
import { finishLoading, loading, openModal } from '../features/uiSlice';
import CardPaymentModal from '../components/BookingTicket/CardPaymentModal';

const BookingTickets = () => {
  const { id } = useParams();
  const { state } = useFetch(getTicketRoomInfo, id);
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState(false);

  const { selectedSeats, selectedVipSeats, bookingData } = useSelector(
    (state) => state.seat
  );
  const { isModalOpen } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps = ['Chọn ghế', 'Chọn phương thức thanh toán', 'Hoàn thành'];

  const handleNext = () => {
    if (selectedSeats.length > 0 || selectedVipSeats.length > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      toast.error('Bạn chưa chọn ghế nào');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBooking = async () => {
    try {
      dispatch(loading);
      await bookingMovie({
        maLichChieu: id,
        danhSachVe: bookingData,
      });
      dispatch(finishLoading);
    } catch (error) {
      console.log(error);
    }
    toast('✔️ Đặt vé thành công');
    handleNext();
  };
  const handleCardPayment = () => {
    dispatch(openModal());
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <>{state && <Seats data={state.danhSachGhe} />}</>;
      case 1:
        return (
          <div id='payment-method'>
            <Button
              style={{
                borderRadius: 35,
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '2px solid',
              }}
              sx={{ mt: 4 }}
              disabled={!checked}
              variant='outlined'
              onClick={handleBooking}
            >
              <GiMoneyStack />
              Thanh Toán Tại Quầy
            </Button>
            <Button
              color='warning'
              style={{
                borderRadius: 35,
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
              disabled={!checked}
              variant='contained'
              sx={{ mt: 5, mb: 5 }}
              onClick={handleCardPayment}
            >
              <FaCcVisa />
              Thanh Toán Qua Thẻ
            </Button>
            <Box textAlign='left'>
              <Checkbox
                checked={checked}
                sx={{ color: 'var(--primary-yellow)', pl: 0 }}
                onChange={(e) => setChecked(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              Tôi đồng ý với các điều khoản về mua và sử dụng vé xem phim, đồng thời xác
              nhận sẽ không hủy hoặc thay đổi thông tin đối với vé đã mua (khách hàng sẽ
              không được hoàn tiền).
            </Box>
          </div>
        );
      case 2:
        return (
          <Box
            sx={{
              width: '95%',
              mb: 4,
              mt: 5,
              p: 5,
              backgroundColor: 'var(--primary-transparent)',
              borderRadius: 'var(--primary-borderRadius)',
              boxShadow: 'var(--primary-boxShadow)',
            }}
          >
            <p>
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.<br></br>
              Thông tin vé đã được gửi đến email của bạn<br></br>
              Chúc bạn có một buổi xem phim vui vẻ , hẹn gặp các bạn tại rạp.<br></br>
            </p>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Wrapper>
      {isModalOpen && <CardPaymentModal handleBooking={handleBooking} />}
      <Box className='steppers-box'>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                <Typography component='span'>{getStepContent(index)}</Typography>
                <Box>
                  <div>
                    {index === 0 && (
                      <>
                        <Button
                          color='warning'
                          variant='contained'
                          onClick={handleNext}
                          sx={{ mr: 1 }}
                        >
                          Tiếp Tục
                        </Button>
                        <Button
                          style={{ color: 'var(--primary-white)', border: '1px solid' }}
                          variant='outlined'
                          onClick={() => dispatch(seatActions.reset())}
                        >
                          bỏ chọn tất cả
                        </Button>
                      </>
                    )}
                    {index === 1 && (
                      <Button
                        style={{ color: 'var(--primary-white)', border: '1px solid' }}
                        variant='outlined'
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        &larr; trở về
                      </Button>
                    )}
                    {index === 2 && (
                      <>
                        <Button
                          color='warning'
                          variant='contained'
                          onClick={() => navigate('/profile')}
                          sx={{ mr: 1 }}
                        >
                          Xem Lịch Sử Đặt Vé
                        </Button>
                        <Button
                          style={{ color: 'var(--primary-white)', border: '1px solid' }}
                          variant='outlined'
                          onClick={() => navigate('/')}
                          sx={{ mr: 1 }}
                        >
                          Về Trang Chủ
                        </Button>
                      </>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      {state && <BookingInfo data={state.thongTinPhim} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 14rem;
  padding-bottom: 12rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
  background-size: cover;
  min-height: 100vh;
  display: grid;
  margin: 0 auto;

  grid-template-columns: auto auto;
  justify-items: center;
  .steppers-box {
    justify-self: center;
    //modify stepper label color
    .MuiStepLabel-label.Mui-active {
      color: var(--primary-white);
    }
    .MuiStepLabel-label.Mui-completed {
      color: var(--secondary-gray);
    }
    .MuiStepLabel-labelContainer {
      color: var(--secondary-gray);
    }

    // main stepper collapse content
    .MuiCollapse-wrapperInner.MuiCollapse-vertical {
      width: 55rem;
      display: grid;
      place-items: center;
      text-align: center;
      padding-left: 70px;
    }

    .MuiStepContent-root {
      padding-left: 0px;
      padding-right: 0px;
    }

    .MuiTypography-root {
      width: 50rem;
    }

    #payment-method {
      width: 95%;
      background-color: var(--primary-transparent);
      border-radius: var(--primary-borderRadius);
      box-shadow: var(--primary-boxShadow);
      padding: 1rem;
      margin-bottom: 2rem;
      line-height: 1.5rem;
      display: grid;
      place-items: center;
      svg {
        font-size: 2rem;
        margin-right: 12px;
      }
    }
  }

  @media screen and (max-width: 1279px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 600px) {
    .steppers-box {
      .MuiCollapse-wrapperInner.MuiCollapse-vertical {
        width: 38rem;
        padding-left: 0px;
      }
      .MuiTypography-root {
        width: 38rem;
      }
    }
  }
  @media screen and (min-width: 2000px) {
    justify-items: start;
  }
`;

export default BookingTickets;
