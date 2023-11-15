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
          <div style={{ backgroundColor: '#120338', borderRight: '2px solid white', borderTop: '2px solid white', height: '6vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>Recent Chats</span></div>
          <div className='scrollable'>
            <ChatList />
          </div>

        </div>

        <div className='chat'>
          <Chat />
        </div>

        <div className='online-users'>
          <div style={{ backgroundColor: '#120338', borderLeft: '2px solid white', borderTop: '2px solid white', height: '6vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>Online Users</span></div>
          <div className='scrollable'>
            <OnlineUsers />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Conversify