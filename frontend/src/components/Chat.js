import React, { useEffect, useState } from 'react';
import RecievedMessage from './RecievedMessage';
import SentMessage from './SentMessage';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd'; // Import the Button component
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';


const Chat = () => {
  const userId = useSelector((state) => state.modal.userId);
  const [conversationData, setConversationData] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // Handle sending the message here
    const message = values.message;


   
      const response = await axios.post(`http://localhost:3333/api/message/send-message?reciever_id=${userId}`, {
      "message": message,
    })
   
  console.log('response', response);
    // Send the message to the server or perform the necessary action
    // You can use axios.post to send the message to the server

    // After sending, you may want to update the conversationData state
    // For now, I'll just update the state with the sent message
    // setConversationData([...conversationData, { text: message, sender: { id: userId } });

    // Clear the message input field
    form.resetFields(); // Reset the form fields
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

  console.log('conversationData', conversationData);

  return (
    <div>
      <div style={{ backgroundColor: '#120338', borderTop: '2px solid white', height: '6vh', color: 'white', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <span>Nasim Ahmad</span>
      </div>
      <ul style={{ listStyle: 'none', paddingInlineStart: '0px', marginBlockStart: '0', marginBlockEnd: '0' }}>
        {conversationData.map((elem, index) => {
          if (elem.reciever.id === userId) {
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
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form} // Assign the form instance to the form variable
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
