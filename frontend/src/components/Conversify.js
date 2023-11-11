import React from 'react'
import OnlineUsers from './OnlineUsers'
import ChatHeader from './ChatHeader'
import './Conversify.css'
const Conversify = () => {
  return (
    <div className="full-height">
      <ChatHeader />

      <div className='chat-container'>

      <div className='recent-chat-users'>
        <h2>Recent Chats</h2>
        <div className='scrollable'>
        <OnlineUsers />
        </div>
        
      </div>

      <div className='chat'>
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