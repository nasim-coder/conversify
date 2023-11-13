import React, { useEffect, useState } from 'react';
import RecievedMessage from './RecievedMessage';
import SentMessage from './SentMessage';
import { useSelector } from 'react-redux';
import { Input, Button, Space } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Chat = () => {
  const token = localStorage.getItem('jwtToken');
  const userdata = jwtDecode(token);
  const [messageInput, setMessageInput] = useState('');
  const { userId, recieverName } = useSelector((state) => state.modal);
  const [conversationData, setConversationData] = useState([]);





  const sendMessage = async (event) => {
    event.preventDefault()
    console.log('messageInput', messageInput);
    const response = await axios.post(`http://localhost:3333/api/message/send-message?reciever_id=${userId}`, {
      message: messageInput,
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

    setMessageInput('');
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
      <div style={{ backgroundColor: '#120338', borderTop: '2px solid white', height: '6vh', color: 'white', display: 'flex', alignItems: 'center'}}>
        <span>{`Message with ${recieverName}`}</span>
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

      <div className='form-container' style={{ margin: '50px' }}>
        <form onSubmit={sendMessage}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder='Type Message'
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              required
            />
            <Button className='btn-bg' htmlType='submit'>Send</Button>
          </Space.Compact>
        </form>
      </div>
    </div>
  );
};

export default Chat;
