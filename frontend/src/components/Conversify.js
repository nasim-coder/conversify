import React from 'react'
import OnlineUsers from './OnlineUsers'
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import './Conversify.css';
import ChatList from './ChatList';


const Conversify = () => {
  return (
    <div className="full-height">
      <ChatHeader />

      <div className='chat-container'>
      
      <div className='recent-chat-users'>
        <h2>Recent Chats</h2>
        <div className='scrollable'>
        <ChatList />
        </div>
        
      </div>

      <div className='chat'>
        <Chat />
      </div>

      <div className='online-users'>
      <h2>Online Users</h2>
        <div className='scrollable'>
        <OnlineUsers />
        </div>
      </div>

      </div>
      
    </div>
  )
}

export default Conversify