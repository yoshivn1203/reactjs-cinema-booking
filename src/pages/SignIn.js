import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Col, Form, Input, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Wrapper } from './SignUp';
import Button from '../components/UI/Button';
import { loginUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const SignIn = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { taiKhoan, matKhau } = values;
    dispatch(loginUser({ taiKhoan, matKhau }));
  };

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [userInfo, navigate]);

  return (
    <Wrapper>
      <div className='card'>
        <h1 className='center mb-2'>Đăng Nhập</h1>
        <Form
          {...layout}
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
          <Col span={18} offset={6} className='center'>
            Bạn Đã Chưa Tài Khoản? <NavLink to='/sign-up'>Đăng Ký</NavLink>
          </Col>
        </Form>
      </div>
    </Wrapper>
  );
};

export default SignIn;
