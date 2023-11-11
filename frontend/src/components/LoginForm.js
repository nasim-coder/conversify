import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import {
  closeLoginModal,
  openRegistrationModal,
  closeRegistrationModal,
} from '../redux/modalSlice';


const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo)};
  const isRegistrationModalOpen = useSelector((state) => state.modal.isRegistrationModalOpen);
  const navigate = useNavigate()
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:3333/api/user/login', {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      navigate('/chat');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
          <Button className='btn-bg' style={{ float: 'right' }} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account?{' '}
        <Button className='btn-bg'
          size="small"
          onClick={() => {
            dispatch(openRegistrationModal()); 
            dispatch(closeLoginModal()); 
          }}
        >
          Register
        </Button>
      </p>

      <Modal
        title="Please register to get started"
        open={isRegistrationModalOpen}
        onCancel={() => dispatch(closeRegistrationModal())}
        closable={true}
        footer={null}
        maskClosable={false}
      >
        <RegisterForm />
      </Modal>
    </div>
  );
};

export default LoginForm;
