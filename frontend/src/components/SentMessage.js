import React from 'react'

const SentMessage = ({ item }) => {

  const { sender, message } = item;
  console.log('item', item);
  return (
    <div style={{ backgroundColor: '#5bff59b5', padding: '0 10px 10px 10px', margin: '10px', borderRadius: '50px 0px 50px 50px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>{sender.firstName}</span>
      </div>
      <div>
        <span>{message}</span>
      </div>
      <div>
        <span style={{ fontSize: '0.7rem' }}>10:25pm</span>
      </div>
    </div>
  )
}

export default SentMessage