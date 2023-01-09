import React from 'react'

const MessageReceivedCard = ({message}) => {
  return (
    <div className='bg-green-500'>
        {message?.body}      
    </div>
  )
}

export default MessageReceivedCard
