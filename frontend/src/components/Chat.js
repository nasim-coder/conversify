import React, { useEffect, useState } from 'react';
import RecievedMessage from './RecievedMessage';
import SentMessage from './SentMessage';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chat = () => {
  const userId = useSelector((state) => state.modal.userId);
  const [conversationData, setConversationData] = useState([]);

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
                <RecievedMessage item={elem} />
              </li>
            );
          } else {
            return (
              <li key={index}>
                <SentMessage item={elem} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Chat;
