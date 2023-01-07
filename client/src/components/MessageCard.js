import React from 'react'
import { useUsers } from '../context/userContext'

const MessageCard = ({message}) => {
  const { user } = useUsers()
  if(user._id === message.user?._id){
    return(
    <div className=' bg-[#0084FF] text-white float-right mt-2 ml-10 p-2 w-fit h-fit rounded-[50px] px-10 text-left'>
      {message?.body}
    </div>
  )
    }
}

export default MessageCard
