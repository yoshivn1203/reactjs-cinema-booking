import { Col, Form, Input } from 'antd';
import Button from '../components/UI/Button';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, toggleRegister } from '../features/userSlice';
import bg from '../assets/poster2.jpg';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} không được để trống!',
  pattern: { mismatch: '${label} không hợp lệ' },
  types: {
    email: '${label} không hợp lệ!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegistered } = useSelector((store) => store.user);

  const onFinish = async (values) => {
    const submitSignUpData = { ...values.user, maNhom: 'GP03' };
    // console.log(submitSignUpData);
    dispatch(registerUser(submitSignUpData));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate('/sign-in');
      dispatch(toggleRegister());
    }
  }, [isRegistered, navigate, dispatch]);

  return (
    <Wrapper>
      <div className='card'>
        <h1 className='center mb-2'>Đăng Ký</h1>
        <Form
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          labelWrap
          colon={false}
        >
          <Form.Item
            name={['user', 'taiKhoan']}
            label='Tên Tài Khoản'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'matKhau']}
            label='Mật Khẩu'
            // initialValue={MOVIE_GROUP_ID}
            rules={[
              { required: true },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái, 1 số and 1 ký tự đặc biệt',
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label='Email'
            rules={[
              {
                type: 'email',
              },
              { required: true },
            ]}
            validateTrigger='onBlur'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'soDT']}
            label='Số Điện Thoại'
            rules={[
              {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{9,11}$/g,
              },
              { required: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'hoTen']}
            label='Họ Tên'
            rules={[{ required: true }]}
            style={{ marginBottom: '3rem' }}
          >
            <Input />
          </Form.Item>
          <div className='button-box'>
            <Button type='submit' className='medium'>
              Đăng Ký
            </Button>
            <Button
              type='button'
              className='medium btn-outline'
              onClick={() => navigate('/')}
            >
              Về Trang Chủ
            </Button>
          </div>
          <Col span={18} offset={6} className='center'>
            Bạn Đã Có Tài Khoản? <NavLink to='/sign-in'>Đăng Nhập</NavLink>
          </Col>
        </Form>
      </div>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
  height: 100vh;
  align-items: center;
  color: var(--primary-yellow);

  .card {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    .center {
      text-align: center;
    }
    background-color: var(--darker-transparent);
    padding: 2rem;
    border-radius: 30px;

    .ant-form-item {
      padding: 0 2rem;
      label {
        color: var(--primary-yellow);
        font-size: 1rem;
      }
    }
    .button-box {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .ant-form {
      color: var(--primary-white);
      font-size: 1rem;
      a {
        text-decoration: underline;
        font-weight: bold;
      }
    }
  }
`;

export default SignUp;
