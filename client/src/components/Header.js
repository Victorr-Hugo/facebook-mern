import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useUsers } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

import icon from '../static/icon.svg'

const Header = () => {
  const { user, searchUser } = useUsers()
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [ settingsModal, setSettingsModal ] = useState(false)
  const [ showMessenger, setShowMessenger ] = useState(false)
  const [ searchNavIsShown, setSearchNavIsShown ] = useState(false)
  const [search, setSearch] = useState({
    description: '',
  })


  const renderResponse = () => {
    if(data.length === 0){
      
    }else{
      return(
        <ul className='absolute w-full h-fit bg-white box-border'>
          {data.map((find) => (
            <div key={find._id} find={find} className='flex-row flex w-full py-1 my-1 px-4 cursor-pointer border-b' onClick={() => navigate('/user/' + find.username)}>
              <div className='w-10 h-10'>
                <img alt='' src={find.image?.url} className='w-10 h-10 min-w-[40px] min-h-[40px] object-cover rounded-full'/>
              </div>              
              <div className='text-neutral-900 my-auto pl-3 font-semibold cursor-pointer'>
                {find.firstname} {find.lastname}
              </div>
              <div className='text-neutral-500 my-auto px-3 font-semibold cursor-pointer'>
                @{find.username}
              </div>
            </div>
          ))}
        </ul>
      )
    }
  }

  const renderFriends = () => {
    return(
      <ul className='w-full px-2 py-2'>
        {user.friends.map((friend) => (
          <li onClick={() => navigate('/messenger')} className='flex-row flex w-full my-2 cursor-pointer'>
            <img alt='' src={friend.image?.url} className='w-10 h-10 object-cover rounded-full'/>
            <div className='ml-2 my-auto text-[18px]'>{friend.firstname} {friend.lastname}</div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <header className='z-[100]'>
        <div className='bg-white w-full shadow-md fixed z-[100]'>
            <div className='h-[60px] px-4 m-auto w-full items-center box-border text-white flex-row flex relative'>
              { window.location.pathname != '/messenger' ? (
                <button onClick={() => navigate('/')} className='cursor-pointer w-10 h-10 items-center flex p-0 m-0'>
                  <img alt='' src={icon} className='w-full h-full min-w-[40px] min-h-[40px]'/>
                </button>
              ):(
                <div onClick={() => navigate('/')} className='h-8 w-8 cursor-pointer'>
                  <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/512px-Facebook_Messenger_logo_2018.svg.png' className='w-full h-full min-w-[40px] min-h-[40px]'/>
                </div>
              ) }
              <button onClick={() => setSearchNavIsShown(true)} className='ml-3 flex-row flex w-[312px] bg-[#f0f2f5] rounded-[50px] py-1 px-2 cursor-pointer hover:bg-[#e6e8eb]'>
                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#666'>
                  <path d='m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z'></path>
                </svg>
                <label className='text-[#666] w-full cursor-pointer m-auto'>search odinbook</label>

              </button>
              <div>
                {searchNavIsShown && (
                  <div onMouseOver={() => setSearchNavIsShown(true)}  onMouseOut={() => setSearchNavIsShown(false)} role='search' aria-label='Search on Odinbook' className='grow ml-2 w-fit absolute z-[1000] left-1 bg-white top-1 rounded-[19px] shadow-md px-3 h-[432px]'>
                    <div className='relative min-w-full w-full'>
                      <Formik
                        initialValues={search}
                        enableReinitialize
                        onSubmit={async(values, actions) => {
                          console.log(values)
                          const res = await searchUser(values)
                          setData(res)
                          actions.setSubmitting(false)
                        }}>
                      {({ isSubmittin, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <div className='bg-[#f0f2f5] mt-2 rounded-[50px] border-none text-[16px] box-border flex relative min-w-full w-full'>
                            <div className='shrink-0 bg-[#f0f2f5] py-2 items-center flex m-auto pl-3 rounded-l-[50px]'>
                              <button type='submit' className='w-6 h-6'>
                                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#666'>
                                  <path d='m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z'></path>
                                </svg>
                              </button>
                            </div>
                            <Field name='description' placeholder='Search Odinbook' className='outline-none bg-transparent w-full  px-4 py-2 m-0 text-[#1c1e21]'/>
                          </div>
                        </Form>
                        )}
                      </Formik>
                      {renderResponse()}
                    </div>
                  </div>
                )}
              </div>

              <div className='grid-cols-5 grid gap-2 w-full px-10 pr-32'>
                <div  onClick={() => navigate('/')}  className=' hover:bg-[#f7f8fa] py-2 rounded-[9px] flex-row flex cursor-pointer'>
                  {window.location.pathname ==='/' ? (
                    <div className='box-border w-full'>
                    <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#1877f2'>
                      <path d='M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5Z'></path>
                    </svg>
                    </div>
                  ): (
                    <svg  onClick={() => navigate('/')}  className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#8a8d91'>
                    <path d='M18.5,24H5.5c-3.032,0-5.5-2.468-5.5-5.5V9.886c0-1.83,.906-3.534,2.424-4.559L8.924,.941c1.867-1.262,4.284-1.262,6.153,0l6.499,4.386c1.518,1.024,2.424,2.729,2.424,4.559v8.614c0,3.032-2.468,5.5-5.5,5.5ZM12,2.997c-.486,0-.974,.144-1.397,.431L4.102,7.813c-.689,.466-1.102,1.24-1.102,2.072v8.614c0,1.379,1.121,2.5,2.5,2.5h13c1.379,0,2.5-1.121,2.5-2.5V9.886c0-.832-.412-1.606-1.102-2.072L13.398,3.428c-.425-.287-.912-.431-1.398-.431Z'></path>
                  </svg>
                  )}
                </div>
                <div  onClick={() => navigate('/watch')}  className=' hover:bg-[#f7f8fa] py-2 rounded-[9px] flex-row flex cursor-pointer'>
                  {window.location.pathname ==='/watch' ? (
                    <div className='box-border w-full'>
                      <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#1877f2'>
                        <path d='M24,19V6a3,3,0,0,0-3-3H3A3,3,0,0,0,0,6V19H11v1H7v2H17V20H13V19Z'></path>
                      </svg>
                    </div> 
                  ): (
                    <svg onClick={() => navigate('/watch')} className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#8a8d91'>
                    <path d='M24,19V5a3,3,0,0,0-3-3H3A3,3,0,0,0,0,5V19H10.5v2h-4v3h11V21h-4V19ZM3,5H21V16H3Z'></path>
                  </svg>
                  )}
                </div>
                <div  onClick={() => navigate('/marketplace')}  className=' hover:bg-[#f7f8fa] py-2 rounded-[9px] flex-row flex cursor-pointer'>
                  {window.location.pathname ==='/marketplace' ? (
                    <div className='box-border w-full'>
                      <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#1877f2'>
                        <path d='M19,17a5.994,5.994,0,0,1-3-.806A5.994,5.994,0,0,1,13,17H11a5.938,5.938,0,0,1-3-.818A5.936,5.936,0,0,1,5,17H4a5.949,5.949,0,0,1-3-.813V21a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V16.188A5.958,5.958,0,0,1,20,17Z'></path>
                        <path d='M17,0V6H15V0H9V6H7V0H2.2L.024,9.783,0,11a4,4,0,0,0,4,4H5a3.975,3.975,0,0,0,3-1.382A3.975,3.975,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a4,4,0,0,0,4-4V10L21.8,0Z'></path>
                      </svg>
                  </div> 
                  ): (
                    <svg  onClick={() => navigate('/marketplace')}  className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#8a8d91'>
                      <g id='_01_align_center' data-name='01 align center'>
                        <path d='M24,10,21.8,0H2.2L.024,9.783,0,11a3.966,3.966,0,0,0,1,2.618V21a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V13.618A3.966,3.966,0,0,0,24,11ZM2,10.109,3.8,2H7V6H9V2h6V6h2V2h3.2L22,10.109V11a2,2,0,0,1-2,2H19a2,2,0,0,1-2-2H15a2,2,0,0,1-2,2H11a2,2,0,0,1-2-2H7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2ZM20,22H4a1,1,0,0,1-1-1V14.858A3.939,3.939,0,0,0,4,15H5a3.975,3.975,0,0,0,3-1.382A3.975,3.975,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a3.939,3.939,0,0,0,1-.142V21A1,1,0,0,1,20,22Z'></path>
                      </g>
                  </svg>
                  )}
                </div>
                <div  onClick={() => navigate('/groups')}  className=' hover:bg-[#f7f8fa] py-2 rounded-[9px] flex-row flex cursor-pointer'>
                  {window.location.pathname ==='/groups' ? (
                    <div className='box-border w-full'>
                      <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#1877f2'>
                        <path d='M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM5.683,16H1a1,1,0,0,1-1-1A6.022,6.022,0,0,1,5.131,9.084a1,1,0,0,1,1.1,1.266A6.009,6.009,0,0,0,6,12a5.937,5.937,0,0,0,.586,2.57,1,1,0,0,1-.9,1.43ZM17,24H7a1,1,0,0,1-1-1,6,6,0,0,1,12,0A1,1,0,0,1,17,24ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8Zm17,8H18.317a1,1,0,0,1-.9-1.43A5.937,5.937,0,0,0,18,12a6.009,6.009,0,0,0-.236-1.65,1,1,0,0,1,1.105-1.266A6.022,6.022,0,0,1,24,15,1,1,0,0,1,23,16Z'></path>
                      </svg>
                    </div> 
                  ): (
                    <svg  onClick={() => navigate('/groups')}  className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#8a8d91'>
                    <path d='M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z'></path>
                  </svg>
                  )}
                </div>
                <div  onClick={() => navigate('/messenger')}  className=' hover:bg-[#f7f8fa] py-2 rounded-[9px] flex-row flex cursor-pointer'>
                  {window.location.pathname ==='/messenger' ? (
                    <div className='box-border w-full'>
                    <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#1877f2'>
                      <path d='M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.9l4.451,3.763a1,1,0,0,0,1.292,0L17.1,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0ZM7,5h5a1,1,0,0,1,0,2H7A1,1,0,0,1,7,5ZM17,15H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7A1,1,0,0,1,7,9H17a1,1,0,0,1,0,2Z'></path>
                    </svg>
                  </div> 
                  ): (
                    <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#8a8d91'>
                    <path d='M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.9l4.451,3.763a1,1,0,0,0,1.292,0L17.1,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,16a2,2,0,0,1-2,2H17.1a2,2,0,0,0-1.291.473L12,21.69,8.193,18.473h0A2,2,0,0,0,6.9,18H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H20a2,2,0,0,1,2,2Z'></path>
                    <path d='M7,7h5a1,1,0,0,0,0-2H7A1,1,0,0,0,7,7Z'></path>
                    <path d='M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z'></path>
                    <path d='M17,13H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z'></path>
                  </svg>
                  )}
                </div>
                </div>

              <div className='spacer w-4 h-px'></div>

              <div className='spacer w-2 h-px'></div>
              <div onClick={() => setShowMessenger(true)} className='p-[10px] rounded-full hover:bg-[#c6c8ce] bg-[#e5e9f0] flex-row flex cursor-pointer'>
                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'  fill='#1b1b1b'>
                  <path d='M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.9l4.451,3.763a1,1,0,0,0,1.292,0L17.1,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0ZM7,5h5a1,1,0,0,1,0,2H7A1,1,0,0,1,7,5ZM17,15H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7A1,1,0,0,1,7,9H17a1,1,0,0,1,0,2Z'></path>
                </svg>
              </div>
              <div className='spacer w-2 h-px'></div>
              <div className='p-[10px] rounded-full hover:bg-[#c6c8ce] bg-[#e5e9f0] flex-row flex cursor-pointer'>
                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'width='18' height='18' fill='#1b1b1b'>
                  <path d='M20.93,7.3c-.34-1.91-2-3.3-3.94-3.3h-.17c.11-.31,.18-.65,.18-1,0-1.65-1.35-3-3-3h-4c-1.65,0-3,1.35-3,3,0,.35,.07,.69,.18,1h-.17c-1.94,0-3.6,1.39-3.94,3.3L.81,19H23.19l-2.27-11.7ZM9,3c0-.55,.45-1,1-1h4c.55,0,1,.45,1,1s-.45,1-1,1h-4c-.55,0-1-.45-1-1Zm-.86,18h7.72c-.45,1.72-2,3-3.86,3s-3.41-1.28-3.86-3Z'></path>
                </svg>
              </div>
              <div className='spacer w-2 h-px'></div>
              <div onClick={() => setSettingsModal(true)} className='flex-row flex cursor-pointer'>
                <img alt='' src={user.image?.url} className='w-[44px] rounded-full p-1 min-w-[44px] min-h-[44px] h-[44px]'/>
              </div>
            </div>
        </div>
        {showMessenger && (
          <div onMouseOut={() => setShowMessenger(false)} className='bg-white p-4 right-10 z-[500] w-[321px] shadow-lg fixed rounded-[9px] top-10 flex-col flex' onMouseOver={() => setShowMessenger(true)} >
            <div className='text-[24px] font-semibold'>Chats</div>
            <div className='w-full mt-3'>
              <div className='bg-[#f0f2f5] w-full px-2 py-1 rounded-[50px]'>
                <input placeholder='Search on Messenger' className='bg-transparent'/>
              </div>
              <div className='w-full h-fit'>
                  {renderFriends()}
                </div>
            </div>                        
          </div>
        )}
        {settingsModal && <div onMouseOver={() => setSettingsModal(true)}  onMouseOut={() => setSettingsModal(false)} className='px-4 fixed z-[500] right-6 rounded-[9px] top-10 py-4 bg-white'>
          <div className='flex-row border-b pb-4 flex w-full'>
            <div className='w-10 h-10'>
              <img alt='' src={user.image?.url} className='w-[full] h-full min-w-full min-h-full rounded-full object-cover'/>
            </div>
            <div className='spacer h-px w-4'></div>
            <div className='flex-col flex'>
              <span className='text-[#050505] m-auto font-semibold text-[22px]'>{user.firstname} {user.lastname}</span>
              <span onClick={() => navigate('/user/' + user.username)} className='text-[14px] my-auto cursor-pointer'>See your profile</span>
            </div>
          </div>
          <div>DarkMode</div>
          <div>Logout</div>
        </div>
      }
    </header>
  )
}

export default Header
