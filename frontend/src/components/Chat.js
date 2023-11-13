import React, { useEffect, useState } from 'react';
import RecievedMessage from './RecievedMessage';
import SentMessage from './SentMessage';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Chat = () => {
  const token = localStorage.getItem('jwtToken');
  const userdata = jwtDecode(token);

  const userId = useSelector((state) => state.modal.userId);
  const [conversationData, setConversationData] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const message = values.message;
    const response = await axios.post(`http://localhost:3333/api/message/send-message?reciever_id=${userId}`, {
      message: message,
    });

    const newMessage = {
      id: response.data.data.id,
      message: response.data.data.message,
      sender: {
        id: response.data.data.sender_id,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
      },
      reciever: null,
    };

    setConversationData([...conversationData, newMessage]);

    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchConversation = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/api/message/conversation?reciever_id=${userId}`);
        setConversationData(response.data.data);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchConversation();
  }, [userId]);

  return (
    <div>
      <div style={{ backgroundColor: '#120338', borderTop: '2px solid white', height: '6vh', color: 'white', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <span>Nasim Ahmad</span>
      </div>
      <ul style={{ listStyle: 'none', paddingInlineStart: '0px', marginBlockStart: '0', marginBlockEnd: '0' }}>
        {conversationData.map((elem, index) => {
          if (elem.sender.id === userdata.id) {
            return (
              <li key={index}>
                <SentMessage item={elem} />
              </li>
            );
          } else {
            return (
              <li key={index}>
                <RecievedMessage item={elem} />
              </li>
            );
          }
        })}
      </ul>




      <div className='form-container'>
  <Form
    name="basic"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    form={form}
  >
    <Form.Item
      name="message"
      rules={[
        {
          required: true,
          message: 'Please type your message!',
        },
      ]}
    >
      <Input placeholder="Please type your message" />
    </Form.Item>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Form.Item style={{ flex: 1 }}>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </div>
  </Form>
</div>





    </div>
  );
};

export default Chat;
