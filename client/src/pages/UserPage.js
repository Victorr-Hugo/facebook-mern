import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

export const UserPage = () => {
    const { user, getUser, sendFriendForm } = useUsers()
    const [ finded, setFinded ] = useState({})
    const [ isFriend, setIsFriend ] = useState(false)
    const [ isShown, setIsShown ] = useState(false)
    const [myPage, setMyPage] = useState(false)
    const navigate = useNavigate()
    const res = JSON.parse(localStorage.getItem('user'))
    const current = res.user
    const [friend, setFriend] = useState({
      from: '',
      to:'',
    })


    const params = useParams()
    useEffect(() => {
      (async () => {
        if(params.username){
          const finded = await getUser(params.username)
          setFinded(finded)
          if(finded._id === current ) setMyPage(true)
        }
      })()
    },[params.username, getUser])

    const renderPosts = () => {
      return(
        <ul>
          {finded?.posts?.map((post) => (
            <li key={post._id} post={post} className='flex-col flex w-full bg-white pt-4 my-2 rounded-[9px]'>
              <div className='flex-row flex w-full px-4'>
                <img alt='' src={post.author.image?.url} className='w-[58px] h-[58px] min-w-[58px] min-h-[58px] object-cover rounded-full'/>
                <div className='flex-col flex w-full px-2'>
                  <span className='text-[#3B5990] font-semibold cursor-pointer'>{post.author.firstname} {post.author.lastname}</span>
                  <span className='text-[13px] font-medium cursor-pointer'>{post.author.username}</span>
                </div>
              </div>
              <span className='py-1 px-5'>{post.body}</span>
              <div>
                {post.image ? (
                  <div>
                    <img alt='' src={post.image.url} className='h-[333px] w-full object-cover '/>
                  </div>
                ):null}
              </div>
              <div className='grid-cols-3 grid gap-3 w-full text-[13px] px-10 text-neutral-600 py-1'>
                <span>{post.likes?.length} Likes</span>
                <span>{post.comments?.length} Comments</span>
            </div>
              <div className='w-full border-t border-b'>
                <div className='py-1 w-full grid-cols-3 grid gap-3'>
                    <label className='text-[13px] text-neutral-700 font-medium flex-row flex cursor-pointer hover:bg-neutral-100 m-auto px-8 py-2 rounded-[6px]'>
                        <svg xmlns='http://www.w3.org/2000/svg' id='Outline' data-name='Isolation Mode' viewBox='0 0 24 24' width='20' height='20'>
                            <path fill='#666' d='M22.773,7.721A4.994,4.994,0,0,0,19,6H15.011l.336-2.041A3.037,3.037,0,0,0,9.626,2.122L7.712,6H5a5.006,5.006,0,0,0-5,5v5a5.006,5.006,0,0,0,5,5H18.3a5.024,5.024,0,0,0,4.951-4.3l.705-5A5,5,0,0,0,22.773,7.721ZM2,16V11A3,3,0,0,1,5,8H7V19H5A3,3,0,0,1,2,16Zm19.971-4.581-.706,5A3.012,3.012,0,0,1,18.3,19H9V7.734a1,1,0,0,0,.23-.292l2.189-4.435A1.07,1.07,0,0,1,13.141,2.8a1.024,1.024,0,0,1,.233.84l-.528,3.2A1,1,0,0,0,13.833,8H19a3,3,0,0,1,2.971,3.419Z'></path>
                        </svg>
                        <div className='spacer w-2 h-px'></div>
                        <p className='text-[13px] text-[#666] font-medium flex-row flex'>Like</p>
                    </label>
                    <label onClick={() => setIsShown(true)} className='text-[13px] text-neutral-700 font-medium flex-row flex cursor-pointer hover:bg-neutral-100 m-auto px-8 py-2 rounded-[6px]'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'>
                            <g fill='#666'  id='_01_align_center' data-name='01 align center'>
                                <path d='M24,24H12.018A12,12,0,1,1,24,11.246l0,.063ZM12.018,2a10,10,0,1,0,0,20H22V11.341A10.018,10.018,0,0,0,12.018,2Z'></path>
                                <rect x='7' y='7' width='6' height='2'/>
                                <rect x='7' y='11' width='10' height='2'/>
                                <rect x='7' y='15' width='10' height='2'/>
                            </g>
                        </svg>
                        <div className='spacer w-2 h-px'></div>
                        <p className='text-[13px] text-[#666] font-medium flex-row flex'>Comment</p>
                    </label> 
                </div>
              </div>
              <div>
              {post.comments.map((comment) => (
                  <div key={comment._id} comment={comment} className='flex-row flex w-full py-1'>
                      <div className='w-10 h-10'>
                          <img alt='' src={comment.author?.image?.url} className='w-10 h-10 object-cover rounded-full min-w-[40px] min-h-[40px]'/>
                      </div>
                      <div className='spacer h-px w-2'></div>
                      <div className='flex-col flex w-full bg-[#f0f2f5] px-5 rounded-[50px]'>
                          <div className=' my-auto py-2 text-[13px]'>
                              {comment.body}
                          </div>
                      </div>
                  </div>
              ))}
              </div>
            </li>
          ))}
        </ul>
      )
    }

    const renderFriends = () => {
      if(finded?.friends?.length === 0){
        return(
          'there are no friends yet...'
        )
      }else{
        return(
          <ul>
            {finded?.friends?.map((friend) => {
              return(
                <li key={friend._id} friend={friend}>
                  {friend.firstname}
                </li>
              )
            })}
          </ul>
        )
      }
    }
    const renderPages = () => {
      if(finded?.friends?.length === 0){
        return(
          'there are no pages yet...'
        )
      }else{
        return(
          <ul>
            {finded?.pages?.map((page) => (
              <li key={page._id} page={page}>

              </li>
            ))}
          </ul>
        )
      }
    }

    const handleSendFriendForm= () => {
      setFriend({
        from:current,
        to:finded._id
      })
      sendFriendForm(friend)
    }

    return (
    <div className='h-full'>
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-20 z-10 cursor-default'>
              <div className='w-full flex-row flex h-full'>
                <NavBar user={user}/>
                <div className='w-full h-full pl-[471px] '>
                  {finded?.banner ? (
                    <div className='mx-auto min-w-full max-w-full w-full box-border'>
                      <div className='h-[250px] m-0 justify-center w-full items-center flex relative'>
                        <img alt='' src={finded.banner?.url} className='w-full h-full min-w-full min-h-full object-cover'/>
                      </div>
                      <div className='bg-white p-10 w-full h-full relative flex-row flex box-border'>
                      <div className='z-[500] absolute bottom-0 left-10 '>
                          <div className='w-[178px] h-[178px] border-black'>
                            <img alt='' src={finded?.image?.url} className='w-full h-full object-cover border-[5px] border-[white] rounded-full shadow-md'/>
                          </div>
                        </div>
                        <div className='z-[500] absolute left-[238px]  bottom-1/3 flex-col flex'>
                          <span className='text-neutral-800 text-[38px] font-semibold'>{finded?.firstname} {finded?.lastname}</span>
                          <span className='text-neutral-500 text-[17px] font-medium'>@{finded?.username}</span>
                        </div>
                        {!myPage && 
                        <div className='mr-0 ml-auto right-10 bottom-4'>
                          <button className='flex-row flex bg-[#1877f2] px-4 py-2 border-neutral-400 rounded-[3px]  text-white font-semibold shadow-inner'>Send Message</button>
                          <div className='spacer w-px h-4'></div>
                          <button onClick={() => handleSendFriendForm()} className='flex-row flex bg-[#1877f2] px-4 py-2 border-neutral-400 rounded-[3px]  text-white font-semibold shadow-lg hover:bg-[#186ddd]'>
                            <svg fill='#ffff' xmlns='http://www.w3.org/2000/svg' id='Outline' data-name='Isolation Mode' viewBox='0 0 24 24' width='24' height='24' x='0' y='0'>
                              <path d='M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z'></path>
                              <circle cx='12' cy='6' r='6'></circle>
                            </svg>
                            <div className='spacer h-px w-3'></div>
                            <span className='m-auto'>Add User</span>
                          </button>
                        </div>}
                      </div>
                    </div>
                  ): (
                    <div className='mx-auto min-w-full max-w-full w-full box-border px-20'>
                      <div className='h-[321px] m-0 justify-center w-full items-center flex relative'>
                        <img alt='' src='https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png' className='w-full h-full object-cover grayscale saturate-50 opacity-50'/>
                      </div>
                      <div className='bg-white p-10 w-full h-full relative flex-row flex box-border'>
                      <div className='z-[500] absolute bottom-0 left-10 '>
                          <div className='w-[178px] h-[178px] border-black'>
                            <img alt='' src={finded?.image?.url} className='w-full h-full object-cover border-[5px] border-[white] rounded-full shadow-md'/>
                          </div>
                        </div>
                        <div className='z-[500] absolute left-[238px]  bottom-1/3 flex-col flex'>
                          <span className='text-neutral-800 text-[38px] font-semibold'>{finded?.firstname} {finded?.lastname}</span>
                          <span className='text-neutral-500 text-[17px] font-medium'>@{finded?.username}</span>
                        </div>
                        <div className='mr-0 ml-auto right-10 bottom-4'>
                          <button className='flex-row flex bg-[#1877f2] px-4 py-2 border-neutral-400 rounded-[3px]  text-white font-semibold shadow-inner'>Send Message</button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='flex-row flex w-full pt-10 px-20'>
                    <div className='flex-col flex w-1/2 pr-4 pt-3'>
                      <div className='bg-white'>
                        <div className='w-full text-[#3B5990] font-semibold cursor-pointer rounded-[4px] px-2 py-2 border  bg-[#f8fafc]'>
                          <span>Friends</span>
                        </div>
                        <div className=''>
                          {renderFriends()}
                        </div>
                      </div>
                      <div className='bg-white my-4'>
                        <div className='w-full text-[#3B5990] font-semibold cursor-pointer rounded-[4px] px-2 py-2 border  bg-[#f8fafc]'>
                          <span>Pages</span>
                        </div>
                        <div className=''>
                          {renderPages()}
                        </div>
                      </div>
                    </div>
                    <div className='w-full box-border'>
                      <div className='w-full'>
                        {renderPosts()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
        </div>
    </div>
  )
}
