import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGroups } from '../context/groupContext'

const GroupCard = ({group}) => {
    const { joinGroup } = useGroups()
    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('user'))
    const [ groupJoined, setGroupJoined ] = useState({
        groupId: group._id,
        userId:  data.user,
    })

  return (
    <div className='shrink-0 grow-0  box-border shadow-md'>
        <div className='p3'>
            <div onClick={() => navigate('/group/' + group._id)} className='relative cursor-pointer'>
                <div className='w-[279px] h-[119px]'>
                    <img alt='' src={group.banner?.url} className='w-full h-full min-w-[279px] min-h-[119px] object-cover'/>
                </div>
                <div className='bg-white w-full px-3 py-2 rounded-b-[4px] flex-col flex'>
                    <span className='text-[17px] font-semibold'>{group.title}</span>
                    <span className='text-[#65676B] font-normal leading-[1.3333] text-[14px]'>{group.users?.length} members</span>
                    <div className='spacer w-px h-2'></div>
                    <div className='px-2 py-1 w-full'>
                        <button onClick={() => joinGroup(groupJoined)} className='w-full m-auto leading-[1.3333] text-[14px] py-2 font-semibold bg-[#E4E6EB]'>Join</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GroupCard
