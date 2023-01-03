import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api/users'
import { useUsers } from '../context/userContext'

const NavBar = () => {
    const navigate = useNavigate()
    const { acceptFriendForm } = useUsers()
    const [user, setUser] = useState({})
    const res = JSON.parse(localStorage.getItem('user'))
    const [ friend, setFriend ] = useState({
    })

    useEffect(() => {
        (async () => {
            if(res.user){
                const user = await getCurrentUser(res.user)
                setUser(user.data)
            }
        })()
    }, [res.user, getCurrentUser])

    const handleAccept = (from, to) => {
        setFriend({
            from,
            to
        })        
        console.log(friend)
        acceptFriendForm(friend)
    }


    const renderGroups =() => {
        if(user.groups?.length === 0)
        return(
            'there are no groups yet...'
        )
        return(
            <ul>
                {user.groups?.map((group) => {
                    <div key={group._id} group={group}>{group.title}</div>
                })}
            </ul>
        )
    }
    const renderFriendsRequests = () => {
        return(
            <ul>
                {user.friendsRequests?.map((friendrequest) => (
                    <li onClick={() => handleAccept(friendrequest.from?._id, friendrequest.to?._id)} key={friendrequest._id} friendrequest={friendrequest} className='w-full flex-col flex py-1 border-b px-5'>
                        <div className='w-full flex-row flex cursor-pointer'>
                            <img alt='' src={friendrequest.from.image?.url} className='w-6 h-6 rounded-full object-cover'/>
                            <div className='w-4 h-px spacer'></div>
                            <div className='my-auto font-medium text-[14px]'>{friendrequest.from.firstname} {friendrequest.from.lastname}</div>
                            <div className='my-auto mr-0 ml-auto pr-20'>
                                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#666'>
                                    <circle cx='9' cy='6' r='6'></circle>
                                    <path d='M13.043,14H4.957A4.963,4.963,0,0,0,0,18.957V24H18V18.957A4.963,4.963,0,0,0,13.043,14Z'></path>
                                    <polygon points='21 10 21 7 19 7 19 10 16 10 16 12 19 12 19 15 21 15 21 12 24 12 24 10 21 10'></polygon>
                                </svg>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
    <div className='w-[421px] cursor-default flex-col flex px-8 h-full fixed'>
        <div className='text-[21px] font-semibold flex-row flex w-full'>
            <div className='my-auto'>Home</div>
            <div className='mr-0 ml-auto text-[15px] my-auto font-medium text-cyan-800 cursor-pointer'>Create</div>
        </div>
        <div className='spacer w-px h-4'></div>
        <div onClick={() => navigate('/')} className='flex-row flex w-full cursor-pointer'>
            <img alt='' src={user.image?.url} className='w-7 h-7 rounded-full object-fit  cursor-pointer'/>
            <div className='spacer w-3 h-px'></div>
            <span className='my-auto ml-0 mr-auto  text-[#1c1e21] text-[16px] font-semibold  cursor-pointer'>{user.firstname} {user.lastname}</span>
            <div className='mr-0 ml-auto'>
                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#2b2e33'>
                    <g>
                        <path d='M22.586,5.929l-9.879,9.879a1.021,1.021,0,0,1-1.414,0L1.42,5.934.006,7.348l9.873,9.874a3.075,3.075,0,0,0,4.243,0L24,7.343Z'></path>
                    </g>
                </svg>
            </div>
        </div>
        <div className='spacer w-px h-4'></div>
        {renderFriendsRequests()}
        <div className='spacer w-px h-4'></div>
        <div className='flex-col flex w-full border border-b-[#d0d2d4]'></div>
        <div className='spacer w-px h-6'></div>
        <div className='flex-col flex w-full'>
            <div onClick={() => navigate('/messenger')} className='flex-row flex px-2 rounded-[6px]  w-full hover:bg-[#f9fbfd] hover:border h-fit cursor-pointer'>
                <div className='flex-row flex my-auto pt-2'>
                    <div className=' w-10 h-10'>
                        <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#2b2e33'>
                            <path d='M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.9l4.451,3.763a1,1,0,0,0,1.292,0L17.1,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0ZM7,5h5a1,1,0,0,1,0,2H7A1,1,0,0,1,7,5ZM17,15H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7A1,1,0,0,1,7,9H17a1,1,0,0,1,0,2Z'></path>
                        </svg>
                    </div>
                    <span>Messenger</span>
                </div>
            </div>
            <div onClick={() => navigate('/marketplace')} className='flex-row flex px-2 rounded-[6px]  w-full hover:bg-[#f9fbfd] hover:border h-fit cursor-pointer'>
                <div className='flex-row flex my-auto pt-2'>
                    <div className=' w-10 h-10'>
                        <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#2b2e33'>
                            <path d='M19,17a5.994,5.994,0,0,1-3-.806A5.994,5.994,0,0,1,13,17H11a5.938,5.938,0,0,1-3-.818A5.936,5.936,0,0,1,5,17H4a5.949,5.949,0,0,1-3-.813V21a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V16.188A5.958,5.958,0,0,1,20,17Z'></path>
                            <path d='M17,0V6H15V0H9V6H7V0H2.2L.024,9.783,0,11a4,4,0,0,0,4,4H5a3.975,3.975,0,0,0,3-1.382A3.975,3.975,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a4,4,0,0,0,4-4V10L21.8,0Z'></path>
                        </svg>
                    </div>
                    <span>Marketplace</span>
                </div>
            </div>
            <div onClick={() => navigate('/groups')} className='flex-row flex px-2 rounded-[6px]  w-full hover:bg-[#f9fbfd] hover:border h-fit cursor-pointer'>
                <div className='flex-row flex my-auto pt-2'>
                    <div className=' w-10 h-10'>
                        <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#2b2e33'>
                            <path d='M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM5.683,16H1a1,1,0,0,1-1-1A6.022,6.022,0,0,1,5.131,9.084a1,1,0,0,1,1.1,1.266A6.009,6.009,0,0,0,6,12a5.937,5.937,0,0,0,.586,2.57,1,1,0,0,1-.9,1.43ZM17,24H7a1,1,0,0,1-1-1,6,6,0,0,1,12,0A1,1,0,0,1,17,24ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8Zm17,8H18.317a1,1,0,0,1-.9-1.43A5.937,5.937,0,0,0,18,12a6.009,6.009,0,0,0-.236-1.65,1,1,0,0,1,1.105-1.266A6.022,6.022,0,0,1,24,15,1,1,0,0,1,23,16Z'></path>
                        </svg>
                    </div>
                    <span>Groups</span>
                </div>
            </div>
            <div>
                {renderGroups()}
            </div>
        </div>
    </div>
  )
}

export default NavBar
