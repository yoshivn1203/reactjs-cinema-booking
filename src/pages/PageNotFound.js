import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bg from '../assets/page-not-found.jpg';
import { OutlineButton } from '../components/UI/Button';
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='backhome-btn'>
        <OutlineButton onClick={() => navigate('/')}>Về Trang Chủ</OutlineButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${bg});
  background-size: contain;
  background-position: center;
  height: 100vh;
  width: 100%;
  .backhome-btn {
    position: fixed;
    bottom: 5rem;
    width: 100%;
    text-align: center;
  }
`;
export default PageNotFound;
