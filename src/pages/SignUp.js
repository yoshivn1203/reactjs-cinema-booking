import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUpApi } from '../services/user';
import bg from '../assets/poster2.jpg';
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
  required: '${label} is required!',
  pattern: { mismatch: '${label} is not valid' },
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    const submitSignUpData = { ...values.user, maNhom: 'GP03' };
    console.log({ submitSignUpData });
    const result = await signUpApi(submitSignUpData);
    console.log('Sign Up result', result.data.content);
    message.success('Sign Up Successfully!');
    navigate('/sign-in');
  };

  return (
    <Wrapper>
      <div className='card'>
        <h1 className='signIn__header'>SIGN UP</h1>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          labelWrap
          colon={false}
        >
          <Form.Item
            name={['user', 'taiKhoan']}
            label='Username'
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
            label='Password'
            // initialValue={MOVIE_GROUP_ID}
            rules={[
              { required: true },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Password must have at least 8 characters, 1 letter, 1 number and 1 special character',
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
            label='Phone Number'
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
            label='Full Name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <Col span={18} offset={6}>
            Already have an account? <NavLink to='/sign-in'>Sign In</NavLink>
          </Col>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
  height: 100vh;
  .card {
    background-color: var(--darker-transparent);
    padding: 2rem;
    border-radius: 30px;
  }
`;

export default SignUp;
