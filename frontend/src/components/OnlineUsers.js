import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeId, changeRecieverName} from '../redux/modalSlice';

const OnlineUsers = () => {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const dispatch = useDispatch();
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/user/list');
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers(); // Call the async function
  }, []);



  return (
    <div>
        
      <List
        itemLayout="horizontal"
        dataSource={ userData }
        renderItem={(item, index) => (
          <List.Item style={{paddingLeft: '1rem', cursor: 'pointer'}} onClick={()=>{
            dispatch(changeId(item.id));
            dispatch(changeRecieverName(item.firstName));
            }}>
            <div>
                {item.firstName}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default OnlineUsers;
