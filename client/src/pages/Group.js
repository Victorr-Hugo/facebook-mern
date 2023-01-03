import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { useGroups } from '../context/groupContext'
import { useUsers } from '../context/userContext'

import PostCard from '../components/PostCard'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

export const Group = () => {
    const { getGroup, createGroupPost } = useGroups()
    const navigate = useNavigate()
    const params = useParams()
    const { user } = useUsers()
    const [group, setGroup] = useState({})
    useEffect(() => {
        (async () => {
            if(params.id){
                const group = await getGroup(params.id)
                setGroup(group)
            }
        })()
    },[])
    const res = JSON.parse(localStorage.getItem('user'))

    const [post, setPost] = useState({
        author: res.user,
        body:'',
        image: null,
        fromgroup: params.id
    })

    const renderPosts = () => {
        return(
            <ul>
                { group.posts?.map((post) => (
                    <PostCard key={post._id} post={post}/>
                )) }
            </ul>
        )
    }

    const renderUsers = () => {
        return(
            <ul className='px-4 py-2 w-full'>
                {group.users?.map((user) => (
                    <li key={user._id} user={user} className='flex-row flex w-full py-2 border-b'>
                        <div className='w-14 h-14'>
                            <img alt='' src={user.image?.url} className='min-w-[56px] min-h-[56px] rounded-full object-cover'/>
                        </div>
                        <div className='spacer w-2 h-px'></div>
                        <div className='flex-col flex w-full'>
                            <div className='my-auto text-[15px] text-[#050505] font-semibold'>{user.firstname} {user.lastname}</div>
                            <div className='my-auto text-[12px] text-neutral-600'>@{user.username}</div>
                        </div>
                        <button className='bg-neutral-200 block m-auto rounded-[9px] shadow'>
                            <div className='flex-row flex px-2 rounded-[6px]  w-full hover:bg-[#f9fbfd] hover:border h-fit cursor-pointer'>
                                <div className='flex-row flex m-auto pt-2'>
                                    <div className='py-1 w-10 h-10'>
                                        <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#2b2e33'>
                                            <path d='M24,11.309V24H12.018A12,12,0,1,1,24,11.246ZM13,7H7V9h6Zm4,4H7v2H17Zm0,4H7v2H17Z'></path>
                                        </svg>
                                    </div>
                                    <span className='m-auto block'>Message</span>
                                </div>
                            </div>
                        </button>
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
                <div className='w-full h-full pl-[421px] '>
                    <div className='mx-auto min-w-full max-w-full w-full box-border'>
                        <div className='h-[250px] m-0 justify-center w-full items-center flex relative'>
                            <img alt='' src={group.banner?.url} className='w-full h-[321px] object-cover'/>
                        </div>
                        <div className='w-full py-3 bg-white flex-col flex px-10 border-b shadow-md'>
                            <span className='text-[#050505] pt-10 pb-3 text-[28px] font-semibold'>{group.title}</span>                            
                        </div>
                        <div className='spacer w-px h-3'/>
                        <div className='w-full flex-row flex'>
                        <div className='px-4 w-1/2 py-2 flex-col flex bg-white rounded-[3px] shadow-md border'>
                            <Formik
                            initialValues={post}
                            enableReinitialize
                            onSubmit={async(values, actions) => {
                                const res = user._id
                                if(res){
                                    await createGroupPost(values)
                                    actions.resetForm()
                                    actions.setSubmitting(false)
                                    navigate('/group/' + group._id)
                                }
                            }}>
                            {({ setFieldValue, isSubmitting, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className='w-full flex-col flex'>
                                        <div className='w-full flex-row flex'>
                                            <div className='w-12 h-12'>
                                                <img alt='' src={user.image?.url} className='block w-12 h-12 min-w-[48px] min-h-[48px] rounded-full object-cover'/>
                                            </div>
                                            <Field name='body' placeholder={"What's on your mind, " + user.firstname } className='w-full h-full my-auto pl-2 py-2 outline-none'/>
                                                <div className='spacer w-10 h-px'></div>
                                                <button type='submit' className='bg-[#3B5990] h-full px-4 py-2 rounded-[5px] m-auto'>
                                                <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='white'>
                                                    <g>
                                                        <path d='M5.521,19.9h5.322l3.519,3.515a2.035,2.035,0,0,0,1.443.6,2.1,2.1,0,0,0,.523-.067,2.026,2.026,0,0,0,1.454-1.414L23.989,1.425Z'></path>
                                                        <path d='M4.087,18.5,22.572.012,1.478,6.233a2.048,2.048,0,0,0-.886,3.42l3.495,3.492Z'></path>
                                                    </g>
                                                </svg>   
                                            </button>
                                        </div>
                                        <div className='spacer w-px h-4'></div>
                                        <div className='flex-row flex w-full border-t'>
                                            <div className='my-2 flex-row flex w-fit bg-[#f7f8fa] hover:bg-[#f0f2f5] px-2 rounded-[50px] cursor-pointer'>
                                                <label htmlFor='dropzone' className='py-2 px-4 cursor-pointer'>
                                                    <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#00A400'>
                                                        <path d='M20.591,0H3.409A3.413,3.413,0,0,0,0,3.409V24H24V3.409A3.413,3.413,0,0,0,20.591,0ZM3.409,3H20.591A.41.41,0,0,1,21,3.409V21L10.414,10.414a2,2,0,0,0-2.828,0L3,15V3.409A.41.41,0,0,1,3.409,3Z'></path>
                                                        <circle cx='15.5' cy='7.5' r='2.5'></circle>
                                                    </svg>
                                                    <input type='file' id='dropzone' name='image' className='hidden' onChange={(e) => setFieldValue('image', e.target.files[0])}/>
                                                </label>
                                                <div className='m-auto text-neutral-800 font-medium'>Photo</div>
                                            </div>
                                            <div className='spacer h-px w-2/3'></div>
                                        </div>
                                    </div>
                                </Form>
                            )}    
                            </Formik>    
                        </div>
                        <div className='spacer h-px w-3'></div>
                            <div className='px-4 w-1/2 py-2 flex-col flex'>
                                <div className=' bg-white rounded-[3px] shadow-md border w-full'>
                                    {renderUsers()}
                                </div>                            
                            </div> 
                        </div> 
                        <div>
                            {renderPosts()}
                        </div>
                    </div>
                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}
