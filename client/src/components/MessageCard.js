import React from 'react'
import { useUsers } from '../context/userContext'

const MessageCard = ({message}) => {
  const { user } = useUsers()
  return(
    <div>
      {message.body}
    </div>
  )
}

export default MessageCard
