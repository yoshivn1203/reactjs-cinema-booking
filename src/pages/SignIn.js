import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Col, Form, Input, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Wrapper } from './SignUp';
import Button from '../components/UI/Button';
import { loginUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { taiKhoan, matKhau } = values;
    dispatch(loginUser({ taiKhoan, matKhau }));
  };

  return (
    <Wrapper>
      <div className='card'>
        <h1 className='center mb-2'>Đăng Nhập</h1>
        <Form
          name='nest-messages'
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
          labelWrap
          colon={false}
        >
          <Form.Item
            name='taiKhoan'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên tài khoản!',
              },
            ]}
            style={{ marginBottom: '2rem' }}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Tên tài khoản'
            />
          </Form.Item>
          <Form.Item
            name='matKhau'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
            style={{ marginBottom: '2rem' }}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Mật khẩu'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='' noStyle>
              <Checkbox> Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <div className='button-box'>
            <Button type='submit' className='medium'>
              Đăng Nhập
            </Button>
            <Button
              type='button'
              className='medium btn-outline'
              onClick={() => navigate('/')}
            >
              Về Trang Chủ
            </Button>
          </div>
          <Col className='center'>
            Bạn Đã Chưa Tài Khoản? <NavLink to='/sign-up'>Đăng Ký</NavLink>
          </Col>
        </Form>
      </div>
    </Wrapper>
  );
};

export default SignIn;
