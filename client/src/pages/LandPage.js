import React, { useState } from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'

import PostCard from '../components/PostCard'
import { usePosts } from '../context/postContext'
import { useUsers } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

export const LandPage = () => {
  const { posts } = usePosts()
  const [ isShown, setIsShown ] = useState(false)
  const { users, user } = useUsers()

  const navigate = useNavigate()

  const renderPosts = () => {
    return(
      <ul>
        {posts.map((post) => (
          <PostCard key={post._id} post={post}/>
        ))}
      </ul>
    )
  }

  const renderfriends = () => {
    return(
        <ul className='flex-col pt-20 flex w-full text-[#050505]'>
        <div  className='text-[#424242] font-bold text-[22px] leading-[1.1667]'>Contacts</div>
        <div className='w-px h-4 spacer'></div>
        {user.friends?.map((friend) => (
            <li key={friend?._id} friend={friend} onClick={() => navigate('/user/'+ friend.username)} className='py-1 px-2 border-b flex-row flex cursor-pointer'>
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
    <div className={isShown ? ('w-full h-full overflow-hidden'):('w-full h-full')}>
      {isShown && <PostForm setIsShown={setIsShown}/>}
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-20'>
              <div className='w-full flex-row flex h-full'>
                <NavBar/>
                <div className='w-full h-full pl-[421px] '>
                  <div className='w-2/3 bg-white rounded-[9px] shadow-md flex-col flex  pt-2 pb-1 px-4'>
                    <div className='flex-row flex w-full py-2 border-b-[2px]'>
                      <img alt='' src={user.image?.url} className='w-10 h-10 rounded-full object-cover min-w-[40px] min-h-[40px]'/>
                      <div className='pl-2 w-full'>
                        <div onClick={() => setIsShown(true)} className='bg-[#f0f2f5] m-auto cursor-pointer hover:bg-[#e7eaee] rounded-[50px] w-full px-4 py-2 text-[#666]'>
                          What's on your mind, {user.firstname}?
                        </div>
                      </div>
                    </div>
                    <div className='w-full grid-cols-3 grid gap-3 py-2 px-4'>
                      <div className='flex-row flex cursor-pointer hover:bg-[#f0f2f5] py-1 px-2 m-auto rounded-[9px]'>
                        <div className=' w-6 h-6 min-w-[24px] min-h-[24px]'>
                          <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#3BA55D'>
                            <path d='M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z'></path>
                            <circle cx='15.5' cy='7.5' r='2.5' ></circle>
                          </svg> 
                        </div>
                        <div className='ml-1 font-semibold text-[#666] text-[13px] m-auto'>Photo/Video</div>
                      </div>
                      <div className='flex-row flex cursor-pointer hover:bg-[#f0f2f5] py-1 px-2 m-auto rounded-[9px]'>
                        <div className='w-6 h-6 min-w-[24px] min-h-[24px]'>
                          <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#00AFF4'>
                            <circle cx='9' cy='6' r='6' ></circle>
                            <path d='M13.043,14H4.957A4.963,4.963,0,0,0,0,18.957V24H18V18.957A4.963,4.963,0,0,0,13.043,14Z'></path>
                            <polygon points='21 10 21 7 19 7 19 10 16 10 16 12 19 12 19 15 21 15 21 12 24 12 24 10 21 10'></polygon>
                          </svg> 
                        </div>
                        <div className='ml-1 font-semibold text-[#666] text-[13px] m-auto'>Tag friends</div>
                      </div>
                      <div className='flex-row flex cursor-pointer hover:bg-[#f0f2f5] py-1 px-2 m-auto rounded-[9px]'>
                        <div className='w-6 h-6 min-w-[24px] min-h-[24px]'>
                          <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#f0d123'>
                            <pat d='M16.54,14.72c-.31-.04-.64-.05-1.01-.05-1.68,0-3.09,1.12-3.57,2.65,.01,0,.02,0,.04,0,1.93,0,3.62-1.05,4.54-2.6Z'></pat>
                            <path d='M12,0C5.38,0,0,5.38,0,12s5.38,12,12,12,12-5.38,12-12S18.62,0,12,0ZM5,9.5c0-1.65,1.35-3,3-3s3,1.35,3,3v1.5h-2v-1.05c-.08,.02-.16,.05-.25,.05-.69,0-1.25-.56-1.25-1.25,0-.04,.02-.07,.02-.11-.31,.17-.52,.49-.52,.86v1.5h-2v-1.5Zm7,9.59c-3.6,0-6.56-2.7-7-6.18h14c-.44,3.48-3.4,6.18-7,6.18Zm7-8.09h-2v-1.05c-.08,.02-.16,.05-.25,.05-.69,0-1.25-.56-1.25-1.25,0-.04,.02-.07,.02-.11-.31,.17-.52,.49-.52,.86v1.5h-2v-1.5c0-1.65,1.35-3,3-3s3,1.35,3,3v1.5Z'></path>
                          </svg> 
                        </div>
                        <div className='ml-1 font-semibold text-[#666] text-[13px] m-auto'>Tag friends</div>
                      </div>                    
                    </div>
                  </div>
                    {renderPosts()}
                </div>
                <div className='fixed top-0 right-0 bottom-0 box-border'>
                  <div className='px-10 py-10 flex-col flex'>
                    {renderfriends()}
                  </div>
                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}