import React, { useState } from 'react';
import { Col, Form, Input, Row, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Button, { OutlineButton } from '../../components/UI/Button';
import { MOVIE_GROUP_ID } from '../../utils/common';
import { signInApi, UpdateUserInfoApi } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/userSlice';
import 'antd/lib/radio/style/index.css';

import styled from 'styled-components';

import { finishLoading, loading } from '../../features/uiSlice';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} không được bỏ trống!',
  pattern: { mismatch: '${label} không hợp lệ' },
  types: {
    email: '${label} không hợp lệ!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const UserInfo = ({ userInfo }) => {
  // const { matKhau, hoTen, soDT, email, taiKhoan, maLoaiNguoiDung } = userInfo;
  const dispatch = useDispatch();
  const initialValues = {
    user: {
      matKhau: '',
      hoTen: '',
      soDT: '',
      email: '',
      taiKhoan: '',
      maLoaiNguoiDung: '',
    },
  };
  const onFinish = async (values) => {
    console.log(values.user);
    // const submitUpdateUserInfo = {
    //   ...values.user,
    //   maLoaiNguoiDung,
    //   maNhom: MOVIE_GROUP_ID,
    // };
    dispatch(loading());
    // await UpdateUserInfoApi(submitUpdateUserInfo);
    dispatch(finishLoading());
  };

  return (
    <Wrapper className='user-info'>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        labelWrap
        colon={false}
        labelAlign='left'
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col span={12}>
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
              rules={[
                { required: true },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái, 1 số and 1 ký tự đặc biệt',
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input.Password type='password' />
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
          </Col>
          <Col span={12}>
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
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={['user', 'maLoaiNguoiDung']}
              label='Loại Người Dùng'
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value='QuanTri'>Admin</Radio>
                <Radio value='KhachHang'> Khách Hàng </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Button type='submit' className='small'>
          Lưu Thông Tin
        </Button>
      </Form>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  .ant-form {
    color: var(--primary-white);
    font-size: 1rem;
    a {
      text-decoration: underline;
      font-weight: bold;
    }
  }
  .ant-form-item {
    padding: 0 2rem;
    label {
      color: var(--primary-yellow);
      font-size: 1rem;
    }
  }
`;

export default UserInfo;
