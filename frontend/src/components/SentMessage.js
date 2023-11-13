import React from 'react'

const SentMessage = ({item}) => {

  const {id, sender, message} = item;
  console.log('item', item);
  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' , paddingRight:'10px'}}>
    <span style={{fontWeight: 'bold'}}>{sender.firstName}</span>
    </div>
      <div style={{backgroundColor: 'white', padding: '10px', margin: '5px 10px 10px 10px', borderRadius: '50px 0px 50px 50px'}}>
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

export default SentMessage