import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file for styling
import { Button, Modal } from 'antd';
const LandingPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div className='landing-page'>
    <div className='top-bar'>
        <div className='header'>
            <span>Welcome to Conversify</span>
        </div>
        <div className="login-link">
        <Button type="primary" onClick={showModal}>Login</Button>
        </div>
    </div>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
    </Modal>
    <div className='slogan'>
        <span>Connect and chat with friends in real-time!</span>
    </div>
    </div>
  );
};

export default LandingPage;
