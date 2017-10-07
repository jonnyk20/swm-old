import React from 'react';

const Message = (props) => {
    return (
      <div className='row'>
        <div className='col-sm-3'>
          { props.message.username }
        </div>
        <div className='col-sm-9'>
          { props.message.content }
        </div>
      </div>
    )
}

export default Message;