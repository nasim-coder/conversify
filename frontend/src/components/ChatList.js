import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeId, changeIsGroup, changeRecieverName} from '../redux/modalSlice';

const ChatList = () => {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const dispatch = useDispatch();
  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/message/recent-chats');
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching recent chats:', error);
      }
    };

    fetchRecentChats(); // Call the async function
  }, []);



  return (
    <div>
        
      <List
        itemLayout="horizontal"
        dataSource={ userData }
        renderItem={(item, index) => (
          <List.Item style={{paddingLeft: '1rem', cursor: 'pointer'}} onClick={()=>{
            dispatch(changeId(item.counterpart.id));
            dispatch(changeRecieverName(item.counterpart?.firstName || item.counterpart?.name ));
            if(item.isGroup){dispatch(changeIsGroup())};
            }}>
            <div>
                {item.counterpart.name}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatList;
