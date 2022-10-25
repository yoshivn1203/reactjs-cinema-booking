import React from 'react';
import { Col, Form, Input, Row, Radio } from 'antd';
import Button from '../../components/UI/Button';
import { MOVIE_GROUP_ID } from '../../utils/common';
import { useDispatch } from 'react-redux';
import 'antd/lib/radio/style/index.css';
import { toast } from 'react-toastify';

import styled from 'styled-components';

import { finishLoading, loading } from '../../features/uiSlice';
import { useLocation } from 'react-router-dom';
import { addUserApi, updateUserApi } from '../../services/Admin/adminUserApi';

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

const AddAndEditUsers = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  let initialValues = {
    user: {
      matKhau: '',
      hoTen: '',
      soDt: '',
      email: '',
      taiKhoan: '',
      maLoaiNguoiDung: '',
    },
  };
  if (state) {
    const { matKhau, hoTen, soDt, email, taiKhoan, maLoaiNguoiDung } = state;
    initialValues = {
      user: {
        matKhau,
        hoTen,
        soDt,
        email,
        taiKhoan,
        maLoaiNguoiDung,
      },
    };
  }
  const onFinish = async (values) => {
    const submitUpdateUserInfo = {
      ...values.user,
      maNhom: MOVIE_GROUP_ID,
    };
    try {
      dispatch(loading());
      if (state) {
        await updateUserApi(submitUpdateUserInfo);
        toast('✔️ Cập nhật người dùng thành công');
      } else {
        await addUserApi(submitUpdateUserInfo);
        toast('✔️ Thêm người dùng thành công');
      }
      dispatch(finishLoading());
    } catch (error) {
      toast.error('Tên hoặc email đã tồn tại');
      dispatch(finishLoading());
    }
  };

  return (
    <Wrapper className='user-info'>
      <h3>{state ? 'Sửa Thông Tin Người Dùng' : 'Thêm Người Dùng Mới'}</h3>
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
              <Input disabled={state ? true : false} />
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
              name={['user', 'soDt']}
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
        <Row justify='end'>
          <Button type='submit' className='medium'>
            {state ? 'Lưu Thay Đổi' : 'Thêm Người Dùng'}
          </Button>
        </Row>
      </Form>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  h3 {
    color: var(--primary-yellow);
    margin-bottom: 3rem;
  }
  .ant-form {
    color: var(--primary-white);
    font-size: 1rem;
    background-color: var(--admin-gray);
    padding: 2rem 0;
    border-radius: 10px;
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
  .ant-input-disabled {
    background-color: var(--primary-gray) !important;
    border-color: var(--primary-gray) !important;
    color: var(--light-gray) !important;
  }
  .ant-input-affix-wrapper-disabled {
    background-color: var(--primary-gray) !important;
    border-color: var(--primary-gray) !important;
  }
  .medium {
    margin-top: 1rem;
    margin-right: 2rem;
  }
`;

export default AddAndEditUsers;
