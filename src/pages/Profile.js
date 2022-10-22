import React from 'react';
import styled from 'styled-components';
import { getUserInfoApi } from '../services/userApi';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/grid/style/index.css';

import UserInfo from '../components/Profile/UserInfo';
import BookingHistory from '../components/Profile/BookingHistory';
import useFetch from '../hooks/useFetch';

const Profile = () => {
  const { state: userInfo } = useFetch(getUserInfoApi);

  return (
    <Wrapper>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Thông Tin Tài Khoản' key='1'>
          {userInfo && <UserInfo userInfo={userInfo} />}
        </Tabs.TabPane>
        <Tabs.TabPane tab='Lịch Sử Đặt Vé' key='2'>
          {userInfo && <BookingHistory userInfo={userInfo} />}
        </Tabs.TabPane>
      </Tabs>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  max-width: 1400px;
  margin: 10rem auto 5rem auto;
  margin-top: 10rem;
  .edit-btn-container {
    display: flex;
    justify-content: end;
    margin-bottom: 2rem;
    padding-right: 2rem;
  }
  .ant-tabs {
    color: var(--primary-gray);
  }
  .ant-tabs-tab {
    font-size: 1.2rem;
  }
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
  .ant-input-disabled {
    background-color: var(--primary-gray) !important;
    border-color: var(--primary-gray) !important;
    color: var(--light-gray) !important;
  }
  .ant-input-affix-wrapper-disabled {
    background-color: var(--primary-gray) !important;
    border-color: var(--primary-gray) !important;
  }
`;

export default Profile;
