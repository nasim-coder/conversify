import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import {
  closeLoginModal,
  openRegistrationModal,
  closeRegistrationModal,
} from '../redux/modalSlice';

const onFinish = (values) => {
  handleLogin(values);
};

const handleLogin = async (values) => {
  try {
    // Replace 'YOUR_LOGIN_API_ENDPOINT' with your actual API endpoint
    const response = await axios.post('YOUR_LOGIN_API_ENDPOINT', {
      email: values.email,
      password: values.password,
    });

    // Check for a successful response
    if (response.status === 200) {
      // Optionally, you can handle the successful login here, e.g., set user credentials in Redux or local storage.
      console.log('Login successful');
    } else {
      // Handle login error, e.g., show an error message.
      console.log('Login failed');
    }
  } catch (error) {
    // Handle the error, e.g., show an error message or log it.
    console.error('An error occurred during login:', error);
  }
};


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const isRegistrationModalOpen = useSelector((state) => state.modal.isRegistrationModalOpen);

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
        onFinish={onFinish}
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
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account?{' '}
        <Button
          type="primary"
          size="small"
          onClick={() => {
            dispatch(openRegistrationModal()); // Open the registration modal
            dispatch(closeLoginModal()); // Close the login modal
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
