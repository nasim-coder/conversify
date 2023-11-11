import React from 'react';
import RecievedMessage from './RecievedMessage';
import SentMessage from './SentMessage';
const Chat = () => {
  return (
    <div>
      <div style={{backgroundColor: '#120338', borderTop: '2px solid white', height: '6vh', color: 'white', display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
        <span>Nasim Ahmad</span>
      </div>
     <ul style={{listStyle: 'none', paddingInlineStart: '0px', marginBlockStart: '0', marginBlockEnd: '0'}}>
      <li>
        <RecievedMessage />
      </li>
      <li>
        <SentMessage />
      </li>
     </ul>
     
    </div>
  )
}
export default Chat;
