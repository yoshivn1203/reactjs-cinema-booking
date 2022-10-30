import React, { useState } from 'react';
import { Col, Form, Input, Row, InputNumber, Switch } from 'antd';
import Button from '../../components/UI/Button';
import { MOVIE_GROUP_ID } from '../../utils/common';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'antd/lib/input-number/style/index.css';
import 'antd/lib/switch/style/index.css';
import { finishLoading, loading } from '../../features/uiSlice';
import { useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { addMovieApi, updateMovieApi } from '../../services/Admin/adminMoviesApi';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const { TextArea } = Input;

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

const AddAndEditMovies = () => {
  const [dayvalue, setValue] = useState('2022-11-12T21:11:54');
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  let initialValues = {
    movie: {
      tenPhim: '',
      moTa: '',
      trailer: '',
      dangChieu: true,
      sapChieu: false,
      hot: false,
      danhGia: 5,
    },
  };
  if (state) {
    const {
      tenPhim,
      moTa,
      trailer,
      ngayKhoiChieu,
      dangChieu,
      sapChieu,
      hot,
      danhGia,
      hinhAnh,
    } = state;
    initialValues = {
      movie: {
        tenPhim,
        moTa,
        trailer,
        dangChieu,
        sapChieu,
        hot,
        danhGia,
      },
    };
    !image && setImage(hinhAnh);
    dayvalue === '2022-11-12T21:11:54' && setValue(ngayKhoiChieu);
  }
  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
      setFile(file);
    };
  };
  const onFinish = async (values) => {
    const ngayKhoiChieu = moment(dayvalue).format('DD/MM/YYYY');
    const moviesData = { ...values.movie, ngayKhoiChieu, maNhom: MOVIE_GROUP_ID };
    // console.log(moviesData);
    const formData = new FormData();
    for (const key in moviesData) {
      formData.append(key, moviesData[key]);
    }
    file && formData.append('File', file, file.name);
    // console.log(Object.fromEntries(formData));

    try {
      dispatch(loading());
      if (state) {
        formData.append('maPhim', state.maPhim);
        console.log(Object.fromEntries(formData));

        const result = await updateMovieApi(formData);
        console.log(result);
        toast('✔️ Cập nhật phim thành công');
      } else {
        const result = await addMovieApi(formData);
        console.log(result);

        toast('✔️ Thêm phim thành công');
      }
      dispatch(finishLoading());
    } catch (error) {
      toast.error('Lỗi xin vui lòng thử lại sau');
      dispatch(finishLoading());
    }
  };

  return (
    <Wrapper>
      <h3>{state ? 'Sửa Thông Tin Phim' : 'Thêm Phim Mới'}</h3>

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
              name={['movie', 'tenPhim']}
              label='Tên Phim'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['movie', 'trailer']}
              label='Trailer'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={['movie', 'moTa']}
              label='Mô Tả'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Ngày Khởi Chiếu'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label='Chọn ngày'
                  inputFormat='DD/MM/YYYY'
                  value={dayvalue}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '2rem' }}>
          <Col span={12}>
            <Form.Item
              label='Hình Ảnh'
              name={['hinhAnh']}
              rules={[
                {
                  required: state === null ? true : false,
                },
              ]}
            >
              <Input type='file' onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label='Đánh Giá'
              name={['movie', 'danhGia']}
              rules={[
                {
                  required: true,
                },
              ]}
              labelCol={{ span: 10 }}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Phim Hot'
              valuePropName='checked'
              name={['movie', 'hot']}
              labelCol={{ span: 10 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '2rem' }}>
          <Col span={12}>
            <img src={image} alt='' style={{ marginLeft: '14rem' }} />
          </Col>

          <Col span={6}>
            <Form.Item
              label='Đang Chiếu'
              valuePropName='checked'
              name={['movie', 'dangChieu']}
              labelCol={{ span: 10 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Sắp Chiếu'
              valuePropName='checked'
              name={['movie', 'sapChieu']}
              labelCol={{ span: 10 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row justify='end'>
          <Button type='submit' className='medium'>
            {state ? 'Lưu Thay Đổi' : 'Thêm Phim'}
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
    img {
      width: 200px;
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

export default AddAndEditMovies;
