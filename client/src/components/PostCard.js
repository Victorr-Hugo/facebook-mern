import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/userContext'
import { usePosts } from '../context/postContext'

const PostCard = ({post}) => {
    const { user } = useUsers()
    const { createComment, likePost } = usePosts()
    const [ isShown, setIsShown ] = useState(false)
    const navigate = useNavigate()
    const res = JSON.parse(localStorage.getItem('user'))
    const id = res.user
    const [postLiked, setPostLiked] = useState({
        user: id,
        post: post._id,
    })
    const [ comment, setComment ] = useState({
        post: post._id,
        body:"",
        image: null,
        id:user?._id,
    })

    const renderComments = () => {
        if(post.comments?.length === 0){
            return(
                <div className='hidden'></div>
            )
        }
        return(
            <ul  className='w-full py-2 px-10'>
                {post.comments?.map((comment) => (
                    <li key={comment._id} comment={comment} className='w-full flex-row flex py-1'>
                        <div className='w-6 h-6'>
                            <img alt='' src={comment.author?.image?.url} className='w-full h-full min-w-[24px] min-h-[24px] rounded-full object-cover'/>
                        </div>    
                        <div className='w-2 h-px spacer'></div>                    
                        <div className='bg-[#f0f2f5] px-3 py-1 rounded-[50px] flex-col flex w-fit'>
                            <span className='text-[13px] font-semibold text-[#050505]'>{comment.author?.firstname} {comment.author?.lastname}</span>                                            
                            <span className='text-[.9375rem] leading-[1.3333] text-[#050505] font-normal'>{comment.body}</span>         
                        </div>
                    </li>
                ))}
            </ul>
        )
    }


  return (
    <li className='bg-white w-2/3 shadow-md pt-4 rounded-[9px] flex-col flex border my-3'>
        <div className='w-full h-full flex-col flex'>
            <div className='flex-col px-4 flex w-full'>
                <div className='flex-row flex w-full'>
                    <div className='w-14 h-14'>
                        {post.fromgroup ? (
                            <div className='relative box-border w-[60px] h-[60px]'>
                                <img alt='' src={post.fromgroup?.image?.url} className='w-14 h-14 rounded-[4px] object-cover cursor-pointer min-w-[56px] min-h-[56px]'/>
                                <div className='border-neutral-800 rounded-full border-[1px] absolute bottom-0 right-0 '>
                                    <img onClick={() => navigate('/user/' + post.author.username)} alt='' src={post.author.image?.url} className=' w-[34px] h-[34px] rounded-full object-cover cursor-pointer min-w-[34px] min-h-[34px] border-[3px] border-white'/>    
                                </div>

                            </div>
                        ):(
                            <img onClick={() => navigate('/user/' + post.author.username)} alt='' src={post.author?.image?.url} className='w-11 h-11 rounded-full object-cover cursor-pointer min-w-[44px] min-h-[44px]'/>
                        )}
                    </div>
                        {post.fromgroup ? (
                        <div className='flex-col flex w-full px-3'>
                            <span  onClick={() => navigate('/group/' + post.fromgroup._id)}  className='text-[#3B5990] font-semibold cursor-pointer hover:underline w-fit'>{post.fromgroup.title}</span>
                            <span onClick={() => navigate('/user/' + post.author.username)} className='text-[13px] font-semibold text-neutral-500 cursor-pointer w-fit'>{post.author.firstname} {post.author.lastname}</span>
                        </div>
                        ):(
                        <div className='flex-col flex w-full px-3'>
                            <span onClick={() => navigate('/user/' + post.author?.username)}  className='text-[#3B5990] font-semibold cursor-pointer w-fit'>{post.author?.firstname} {post.author?.lastname}</span>
                            <span onClick={() => navigate('/user/' + post.author.username)} className='text-[13px] font-medium cursor-pointer w-fit'>{post.author?.username}</span>
                        </div>
                        )}
                    <div className=''>
                        <svg className='block m-auto cursor-pointer' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#666'>
                          <circle cx='21.517' cy='12.066' r='2.5'></circle>
                          <circle cx='12' cy='12' r='2.5'></circle>
                          <circle cx='2.5' cy='12' r='2.5'></circle>
                        </svg>
                    </div>
                </div>
                <div className='py-1 px-1'>{post.body}</div>
            </div>
            {post.image? (
                <div className='w-full'>
                    <img alt='' src={post.image.url} className='h-[345px] w-full object-cover'/>
                </div>
            ):null}
            <div className='grid-cols-3 grid gap-3 w-full text-[13px] px-10 text-neutral-600 py-1'>
                <span>{post.likes?.length} Likes</span>
                <span>{post.comments?.length} Comments</span>
            </div>
            <div className='w-full border-t border-b'>
                <div className='py-1 w-full grid-cols-3 grid gap-3'>
                    <label onClick={() => likePost(postLiked)} className='text-[13px] text-neutral-700 font-medium flex-row flex cursor-pointer hover:bg-neutral-100 m-auto px-8 py-2 rounded-[6px]'>
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
            <div className='w-full'>
                {renderComments()}
            </div>
            { isShown ? (
            <div className='w-full flex-row h-full flex px-4 py-2'>
            <div className='w-10 h-10'>
                <img alt='' src={user.image?.url} className='rounded-full min-w-[40px] min-h-[40px] w-full h-full object-cover'/>
            </div>
            <div className='spacer w-2 h-px'></div>
            <Formik
                initialValues={comment}
                enableReinitialize
                onSubmit={async(values, actions) => {
                    await createComment(values)
                    actions.resetForm()
                    actions.setSubmitting(false)
                    navigate('/post/' + post._id)
                }}>
                    {({ setFieldValue, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className='h-full w-full bg-[#f0f2f5] rounded-[50px] px-2 border-[#b1b3b6] border'>
                        <div className='flex-row flex h-full w-full'>
                            <Field name='body' placeholder='Write a comment...' className='w-full h-full m-auto bg-transparent outline-none'/>
    
                            <button type='submit' className=' h-full px-4 py-2 rounded-[5px] m-auto'>
                            <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='#b1b3b6'>
                                <g>
                                    <path d='M5.521,19.9h5.322l3.519,3.515a2.035,2.035,0,0,0,1.443.6,2.1,2.1,0,0,0,.523-.067,2.026,2.026,0,0,0,1.454-1.414L23.989,1.425Z'></path>
                                    <path d='M4.087,18.5,22.572.012,1.478,6.233a2.048,2.048,0,0,0-.886,3.42l3.495,3.492Z'></path>
                                </g>
                            </svg>   
                        </button>
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
            ):null }
        </div>
    </li>
  )
}

export default PostCard
