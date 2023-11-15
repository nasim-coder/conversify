// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './LandingPage.css';
import { Button, Modal } from 'antd';
import LoginForm from './LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  openLoginModal,
  closeLoginModal,
} from '../redux/modalSlice';

const LandingPage = () => {
  const navigate = useNavigate()
  const isLoginModalOpen = useSelector((state) => state.modal.isLoginModalOpen);
  const dispatch = useDispatch();

  return (
    <div className='landing-page'>
      <div className='top-bar'>
        <div className='header'>
          <span>Welcome to Conversify</span>
        </div>
        <div className="login-link">
          <Button className='btn-bg' onClick={() => dispatch(openLoginModal())}>Login</Button>
        </div>
      </div>
      <Modal
        title="Please login to chat"
        open={isLoginModalOpen}
        closable={true}
        footer={null}
        onCancel={() => dispatch(closeLoginModal())}
        maskClosable={false}
      >
        <LoginForm />
      </Modal>
      <div className='slogan'>
        <span>Connect and chat with friends in real-time!</span>
      </div>
      <Button className='btn-bg' onClick={() => navigate('/chat')}>Chat</Button>
    </div>
  );
};

export default LandingPage;
