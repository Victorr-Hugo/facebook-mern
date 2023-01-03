import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import UserCard from '../components/UserCard'

import { useUsers } from '../context/userContext'

export const Friends = () => {
    const { users, user } = useUsers()
    const current = user._id
    const navigate = useNavigate()
    const renderFriendsRequests = () => {
        return(
            <ul className='grid-cols-5 gap-5 grid pb-6'>
                {user.friendsRequests?.map((req) => {
                    if(req.to?._id === current){
                        return(
                            <UserCard key={req.from?._id} form={req?.from}/>
                        )
                    }
                })}
            </ul>
        )
    }

    const renderUsers = () => {
        return(
            <ul className='grid-cols-5 gap-5 grid'>
                {users.map((user) => {
                    if(user._id != current){
                        if(user.friendsRequests?.to === current){
                            return(
                                <UserCard key={user._id} user={user}/>
                            )
                        }
                    }
                })}
            </ul>
        )
    }

    const renderfriends = () => {
        return(
            <ul className='flex-col pt-20 flex w-full text-[#050505]'>
            <div  className='text-[#050505] font-bold text-[1.5rem] leading-[1.1667]'>Friends List</div>
            <div className='w-px h-4 spacer'></div>
            {user.friends?.map((friend) => (
                <li key={friend._id} friend={friend} onClick={() => navigate('/user/'+ friend.username)} className='py-1 px-2 border-b flex-row flex cursor-pointer'>
                    <div className='w-10 h-10'>
                        <img onClick={() => navigate('/user/'+ friend.username)} alt='' src={friend.image?.url} className='w-full h-full min-w-full min-h-full object-cover rounded-full'/>
                    </div>      
                    <div className='w-2 h-px spacer'></div>
                    <div onClick={() => navigate('/user/'+ friend.username)} className='text-[17px] m-auto font-semibold text-[#050505]'>{friend.firstname} {friend.lastname}</div>         
                    <div className='w-2 h-px spacer'></div>
     
                    <div onClick={() => navigate('/user/'+ friend.username)} className='text-[12px] font-semibold m-auto text-neutral-600'>@{friend.username}</div>
                </li>
            ))}
        </ul>
        )
    }

  return (
    <div className='h-full'>
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-24'>
              <div className='w-full flex-row flex h-full'>
                <NavBar/>
                <div className='w-full h-full pl-[321px] '>
                    <ul className='list-none block p-0 m-0 mt-6'>
                        <li className='mt-0 block'>
                            <div className='leading-[32px] text-[24px] font-bold text-[#050505]'>
                                Friends requests
                            </div>
                            <div></div>
                            {renderFriendsRequests()}
                        </li>
                        <li className='mt-0 block'>
                            <div className='leading-[32px] text-[24px] font-bold text-[#050505]'>Users you might know</div>
                            <div></div>
                            {renderUsers()}
                        </li>
                    </ul>
                </div>
                <div className='bg-white fixed top-0 bottom-0 right-0 px-10'>
                    {renderfriends()}
                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}
