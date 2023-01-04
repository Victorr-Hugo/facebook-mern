import React, { useEffect, useState } from 'react'
import { useChats } from '../context/chatContext'

const Conversation = ({friend, currentUser}) => {
  const { searchChat, chat } = useChats()

  const handleclick = () => {
    const res = searchChat(friend._id, currentUser._id)
    console.log(res)
  }
  return (
    <div onClick={handleclick} className='my-4 w-full box-border hover:bg-[#F0F2F5] p-1 rounded-[9px]'>
        <div className='w-full flex-row flex cursor-pointer'>
            <img alt='' src={friend.image?.url} className='rounded-full w-10 h-10 object-cover'/>
            <div className='spacer w-2 h-px'></div>
            <div className='flex-col flex w-full'>
                <div className='text-neutral-900 font-semibold text-[14px]'>{friend.firstname} {friend.lastname}</div>
            </div>
        </div>
    </div>
  )
}

export default Conversation
