import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FooterTest from '../components/FooterTest';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterTest />
    </>
  );
};

export default HomeLayout;
