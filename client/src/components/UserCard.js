import React, { useEffect, useState } from 'react'
import { useUsers } from '../context/userContext'

const UserCard = ({form}) => {
    const data = JSON.parse(localStorage.getItem('user'))
    const { sendFriendForm, getUser, acceptFriendForm } = useUsers()
    const [userCard, setUserCard] = useState()

    const [friend, setFriend] = useState({
        from: data.user,
        to: form?._id,
    })

    useEffect(() => {
        (async () => {
            if(form){
                const data = await getUser(form?.username)
                setUserCard(data)
            }
        })()
    },[getUser, form?.username])

    const handleSendReq = () => {
        sendFriendForm(friend)
        window.location.reload(false)
    }
    const handleReq = () => {
        acceptFriendForm(friend)
    }
  return (
    <li className='block relative '>
        <div className='flex cursor-pointer flex-col bg-white rounded-[5px] w-[240px] shadow-md'>
            <div className='flex-col flex w-full'>
                <img alt='' src={userCard?.image?.url} className='w-[240px] h-[240px] min-w-[240px] min-h-[240px] object-cover'/>
            </div>
            <div className='w-full flex-col flex px-3 py-2'>
                <span className='text-[17px] text-[#050505] font-semibold'>{userCard?.firstname} {userCard?.lastname}</span>  
                <div className='spacer w-px h-2'></div>
                { userCard?.friendsRequests.to ===  data.user ? (
                    <button onClick={() => handleSendReq()}    className='flex-row flex bg-[#E7F3FF] px-4  py-2 rounded-[3px] text-[#1877F2] font-semibold shadow-inner'>Send friend request</button> 
                ):(
                    <button onClick={() => handleReq()}    className='flex-row flex bg-[#E7F3FF] px-4  py-2 rounded-[3px] text-[#1877F2] font-semibold shadow-inner m-auto'>Accept request</button>                 
                )}
                            
            </div>
        </div>
    </li>
  )
}

export default UserCard
