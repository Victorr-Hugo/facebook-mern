import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { usePosts } from '../context/postContext'
import { useUsers } from '../context/userContext'

const PostForm = props => {
    const { user } = useUsers()
    const { createPost } = usePosts()

    const [post, setPost] = useState({
        author: user?._id,
        body:'',
        image: null,
    })
    const navigate = useNavigate()


  return (
    <div className='w-full h-full overflow-hidden absolute bg-black z-[500] bg-opacity-50'>
        <div className='bg-white p-4 w-1/2 absolute top-10 right-1/4 rounded-[9px] shadow-md box-border z-[1000]'>
            <div className='py-2 w-full m-auto text-center text-[#050505] flex-row flex text-[19px] font-semibold border-b-[2px]'>
                <div className='w-full'>Create Post</div>
                <div className='absolute right-10 top-3'>
                    <div onClick={() => props.setIsShown(false)} className=' cursor-pointer rounded-full p-2 bg-neutral-300'>
                        <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#666'>
                            <polygon points='24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061'></polygon>
                        </svg>
                    </div>
                </div>
            </div>
            <div className='flex-row flex w-full py-3'>
                <div className='w-10 h-10'>
                    <img alt='' src={user.image?.url} className='w-full h-full rounded-full min-w-[40px] min-h-[40px]'/>
                </div>
                <div className='flex-col flex w-full px-4'>
                    <div className='text-[#050505] font-semibold text-[14px] my-auto'>{user.firstname} {user.lastname}</div>
                    <div></div>
                </div>
            </div>  
            <Formik
        initialValues={post}
        enableReinitialize
        onSubmit={async(values, actions) => {
            await createPost(values)
            actions.resetForm()
            actions.setSubmitting(false)
            navigate('/')
        }}>
            {({ setFieldValue, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name='body' placeholder={"What's on your mind, " + user.firstname + '?' } className='w-full h-full my-auto pl-2 py-2 outline-none placeholder:text-[24px] text-[24px]'/>      
                    <div className='w-px spacer h-6'></div>   
                    <div className='border-[2px] p-1 rounded-[8px]'>
                        <div className='w-full h-full flex-row flex'>
                            <div className='text-[#050505] w-4/5 text-[17px] p-3'>Add to your Post</div>
                            <label htmlFor='dropzone' className='py-2 px-4 cursor-pointer'>
                            <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='30' height='30' fill='#00A400'>
                                <path d='M20.591,0H3.409A3.413,3.413,0,0,0,0,3.409V24H24V3.409A3.413,3.413,0,0,0,20.591,0ZM3.409,3H20.591A.41.41,0,0,1,21,3.409V21L10.414,10.414a2,2,0,0,0-2.828,0L3,15V3.409A.41.41,0,0,1,3.409,3Z'></path>
                                <circle cx='15.5' cy='7.5' r='2.5'></circle>
                            </svg>
                            <input type='file' id='dropzone' name='image' className='hidden' onChange={(e) => setFieldValue('image', e.target.files[0])}/>
                        </label>
                        <div className='w-6 h-6 py-2 px-4 min-w-[24px] min-h-[24px]'>
                          <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='30' height='30' fill='#00AFF4'>
                            <circle cx='9' cy='6' r='6' ></circle>
                            <path d='M13.043,14H4.957A4.963,4.963,0,0,0,0,18.957V24H18V18.957A4.963,4.963,0,0,0,13.043,14Z'></path>
                            <polygon points='21 10 21 7 19 7 19 10 16 10 16 12 19 12 19 15 21 15 21 12 24 12 24 10 21 10'></polygon>
                          </svg> 
                        </div>
                        </div>
                    </div> 
                    <div className='p-1 cursor-pointer rounded-[8px] mt-2'>
                        {isSubmitting ?(
                        <button type='submit' className='w-full h-full text-[24px] font-semibold bg-neutral-300 text-neutral-500 cursor-not-allowed rounded-[9px] py-1'>
                        Post
                        </button>  
                        ):(
                        <button type='submit' className='w-full h-full text-[24px] font-semibold bg-[#1877f2] text-white rounded-[9px] py-1'>
                        Post
                        </button>  
                        )}                      
                    </div>                
                </Form>
            )}    
        </Formik>            
        </div>
    </div>
  )
}

export default PostForm