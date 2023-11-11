import React from 'react'

const RecievedMessage = ({item}) => {
  const {firstName, message, reciever,} = item;
  console.log('item', item);
  return (
    <div>
      <span style={{paddingLeft: '10px', fontWeight: 'bold'}}>{reciever.firstName}</span>
        <div style={{backgroundColor: 'white', padding: '10px', margin: '5px 10px 10px 10px', borderRadius: '0 50px 50px 50px'}}>
        <div>
            <span>{message}</span>
        </div>
        <div>
            <span style={{fontSize: '0.7rem'}}>10:25pm</span>
        </div>
        </div>
    </div>
  )
}

export default RecievedMessage