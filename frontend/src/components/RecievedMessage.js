import React from 'react'

const RecievedMessage = ({ item }) => {
  const { message, sender, } = item;
  return (
    <div style={{ backgroundColor: '#0a8b1530', padding: '0 10px 10px 10px', borderRadius: '0 50px 50px 50px', margin: '10px' }}>
      <span style={{ fontWeight: 'bold' }}>{sender.firstName}</span>
      <div>
        <span>{message}</span>
      </div>
      <div>
        <span style={{ fontSize: '0.7rem' }}>10:25pm</span>
      </div>
    </div>
  )
}

export default RecievedMessage;