import React from 'react'

const MessageForm = () => {
  return (
    <div className='bg-white z-20 p-4 fixed bottom-0 left-[314px] right-0 '>
        <div className='w-full flex-row flex px-10'>
            <input placeholder='Send Message' className='bg-[#F0F2F5] rounded-[50px] p-1 px-5 text-[#050505] w-full'/>
        </div>      
    </div>
  )
}

export default MessageForm
