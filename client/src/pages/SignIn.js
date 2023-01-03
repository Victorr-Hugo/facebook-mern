import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useUsers } from '../context/userContext'
import { usePosts } from '../context/postContext'

import SignUpForm from '../components/SignUpForm.js'

export const SignIn = () => {
    const { signUser } = useUsers()
    const { posts } = usePosts()
    const [ isShow, setIsShown ] = useState(false)
    const [ user, setUser ] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const renderPosts = () => {
        return(
            <ul>
                {posts?.map((post) => (
                    <div onClick={() => setIsShown(true)} key={post._id} post={post} className='bg-white flex-col flex rounded-[6px] shadow my-2 px-4 py-4'>
                        <div className='flex-row flex w-full'>
                            <div className='w-[52px] h-[52px]'><img alt='' src={post.author.image?.url} className='w-[50px] h-[50px] object-cover rounded-full'/></div>
                            <div className='spacer w-4 h-px'></div>
                            <div className='flex-col flex w-full'>
                                <span className='text-[#3B5990] font-semibold text-[14px]'>{post.author.firstname} {post.author.lastname}</span>
                                <span className='text-[12px] text-neutral-700 font-medium'>{post.author.username}</span>
                            </div>
                        </div>
                        <div className='spacer w-px h-2'></div>
                        <div className='flex-col flex w-full'>
                            <span className='text-[#1d2129] text-[15px] font-medium'>{post.body}</span>
                            <div>
                                {post.image ? (
                                <img alt='' src={post.image?.url} className='w-full h-[343px] object-cover'/>
                                ):null
                            }
                            </div>
                        </div>
                        <div className='w-px spacer h-4'></div>
                        <div className='flex-row px-7 flex w-full border-b pb-2'>
                            <div className='grid-cols-3 w-full grid gap-3'>
                                <label className='text-[13px] text-neutral-700 font-medium m-auto'>{post.likes.length} Likes</label>
                                <label className='text-[13px] text-neutral-700 font-medium m-auto'>{post.comments.length} Comments</label>
                            </div>
                        </div>
                        <div className='flex-row flex w-full border-b py-1 px-10'>
                            <div className='grid-cols-3 w-full grid gap-3'>
                                <label className='text-[13px] text-neutral-700 font-medium flex-row flex cursor-pointer hover:bg-neutral-100 m-auto px-8 py-2 rounded-[6px]'>
                                    <svg xmlns='http://www.w3.org/2000/svg' id='Outline' data-name='Isolation Mode' viewBox='0 0 24 24' width='20' height='20'>
                                        <path fill='#666' d='M22.773,7.721A4.994,4.994,0,0,0,19,6H15.011l.336-2.041A3.037,3.037,0,0,0,9.626,2.122L7.712,6H5a5.006,5.006,0,0,0-5,5v5a5.006,5.006,0,0,0,5,5H18.3a5.024,5.024,0,0,0,4.951-4.3l.705-5A5,5,0,0,0,22.773,7.721ZM2,16V11A3,3,0,0,1,5,8H7V19H5A3,3,0,0,1,2,16Zm19.971-4.581-.706,5A3.012,3.012,0,0,1,18.3,19H9V7.734a1,1,0,0,0,.23-.292l2.189-4.435A1.07,1.07,0,0,1,13.141,2.8a1.024,1.024,0,0,1,.233.84l-.528,3.2A1,1,0,0,0,13.833,8H19a3,3,0,0,1,2.971,3.419Z'></path>
                                    </svg>
                                    <div className='spacer w-2 h-px'></div>
                                    <p className='text-[13px] text-[#666] font-medium flex-row flex'>Like</p>
                                </label>
                                <label className='text-[13px] text-neutral-700 font-medium flex-row flex cursor-pointer hover:bg-neutral-100 m-auto px-8 py-2 rounded-[6px]'>
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
                                <label className='text-[13px] text-neutral-700 font-medium flex-row flex cursor-pointer hover:bg-neutral-100 m-auto px-8 py-2 rounded-[6px]'>
                                    <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24' width='20' height='20'>
                                        <path fill='#666' d='M23.68,16.73l-2.59,2.41c-.54,.54-1.3,.85-2.1,.85s-1.55-.31-2.12-.88l-2.56-2.39c-.4-.38-.43-1.01-.05-1.41,.38-.4,1.01-.42,1.41-.05l2.32,2.16V9c0-1.65-1.35-3-3-3h-4c-.55,0-1-.45-1-1s.45-1,1-1h4c2.76,0,5,2.24,5,5v8.43l2.32-2.16c.4-.38,1.04-.35,1.41,.05,.38,.4,.35,1.04-.05,1.41Zm-10.68,1.27h-4c-1.65,0-3-1.35-3-3V6.57l2.32,2.16c.19,.18,.44,.27,.68,.27,.27,0,.53-.11,.73-.32,.38-.4,.35-1.04-.05-1.41l-2.56-2.39c-1.13-1.13-3.13-1.11-4.22-.02L.32,7.27c-.4,.38-.43,1.01-.05,1.41,.38,.41,1.01,.43,1.41,.05l2.32-2.16V15c0,2.76,2.24,5,5,5h4c.55,0,1-.45,1-1s-.45-1-1-1Z'></path>
                                    </svg>
                                    <div className='spacer w-2 h-px'></div>
                                    <p className='text-[13px] text-[#666] font-medium flex-row flex'>Share</p>
                                </label>                            
                            </div>
                        </div>
                        <div>
                        {post.comments.map((comment) => (
                            <div key={comment._id} comment={comment} className='my-1 flex-row flex w-full'>
                                <div className='w-10 h-10'>
                                    <img alt='' src={comment.author.image?.url} className='w-full h-full rounded-full object-cover'/>
                                </div>
                                <div className='spacer w-2 h-px'></div>
                                <div className='bg-[#f0f2f5] px-4 pr-10 py-[7px] rounded-[50px] text-[13px] my-auto'><span className='text-[#3B5990] font-semibold text-[14px]'>{comment.author.firstname} </span>{comment.body}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </ul>
        )
    }

    return (
    <div className='w-full h-full flex-row flex'>
        {isShow ? (<SignUpForm/>):null}
        <div className='w-full overflow-auto'>
            <div className='w-full h-full flex-col flex py-4 px-8'>
                <div className='flex-col flex w-full py-2'>

                </div>
                <div>
                    {renderPosts()}
                </div>
            </div>
        </div>      
        <div className='grow shrink w-full h-full text-[#050505] relative'>
            <div className='pt-[72px] pb-[112px] ml-[133px]'>
                <div className='w-[396px] rounded-[8px] box-border shadow-xl h-fit bg-white'>
                    <div className='py-10 px-5 box-border'>
                        <Formik
                        initialValues={user}
                        enableReinitialize
                        onSubmit={async(values, actions) => {
                            await signUser(values)
                            actions.resetForm()
                            actions.setSubmitting(false)
                            window.location.reload(false)
                        }}>
                            {({ isSubmitting, handleSubmit }) => (
                                <Form onSubmit={handleSubmit} className='flex-col flex w-full h-full'>
                                    <Field name='email' type='email' placeholder='Email' className='border-[1px] border-solid border-[#dddfe2] text-[#1d2129] rounded-[6px] px-4 py-3 text-[17px] placeholder:text-[17px] inline-block shadow-inner focus:outline-[#1877f2]'/>
                                    <div className='spacer w-px h-4'></div>
                                    <Field name='password' type='password' placeholder='Password' className='border-[1px] border-solid border-[#dddfe2] text-[#1d2129] rounded-[6px] px-4 py-3 text-[17px] placeholder:text-[17px] inline-block shadow-inner focus:outline-[#1877f2]'/>
                                    <div className='spacer w-px h-4'></div>
                                    <button type='submit' className='w-full text-[20px] rounded-[6px] leading-[48px] px-4 bg-[#1877f2] font-bold text-white'>Log In</button>
                                </Form>
                            )}
                        </Formik>             
                        <div className='w-full items-center border-b border-b-solid border-b-[#dadde1] flex h-9'></div>      
                        <div className='spacer w-px h-8'></div>
                        <div className='w-full px-16'>
                            <button onClick={() => setIsShown(true)} className='rounded-[6px] text-[17px] leading-[48px] px-4 bg-[#42b72a] text-white font-bold relative text-center w-full'>Create new account</button>  
                        </div>
                        <div className='spacer w-px h-8'></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-opacity-95 absolute bg-white w-full h-[76px] bottom-0 shadow-inner bg-blend-saturation'>
            <div className='w-full h-full px-[334px] grid grid-cols-3 gap-4 py-4'>
                <a href='https://www.linkedin.com/in/victor-hugo-303324141/' className='text-[#8a8d91] cursor-pointer text-[12px] m-auto flex-row flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" width="24" height="24">
                        <g>
                            <path id="Path_2525" d="M23.002,21.584h0.227l-0.435-0.658l0,0c0.266,0,0.407-0.169,0.409-0.376c0-0.008,0-0.017-0.001-0.025   c0-0.282-0.17-0.417-0.519-0.417h-0.564v1.476h0.212v-0.643h0.261L23.002,21.584z M22.577,20.774h-0.246v-0.499h0.312   c0.161,0,0.345,0.026,0.345,0.237c0,0.242-0.186,0.262-0.412,0.262"/>
                            <path id="Path_2520" d="M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245   c-0.012-0.819-0.685-1.474-1.503-1.463"/>
                            <path id="Path_2526" d="M22.603,19.451c-0.764,0.007-1.378,0.633-1.37,1.397c0.007,0.764,0.633,1.378,1.397,1.37   c0.764-0.007,1.378-0.633,1.37-1.397c-0.007-0.754-0.617-1.363-1.37-1.37H22.603 M22.635,22.059   c-0.67,0.011-1.254-0.522-1.265-1.192c-0.011-0.67,0.523-1.222,1.193-1.233c0.67-0.011,1.222,0.523,1.233,1.193   c0,0.007,0,0.013,0,0.02C23.81,21.502,23.29,22.045,22.635,22.059h-0.031"/>
                        </g>
                    </svg>
                    <label className='cursor-pointer text-[15px] m-auto text-[#050505] font-semibold'>Linkedin</label>
                </a>
                <div className='text-[#8a8d91] cursor-pointer text-[12px] m-auto flex-row flex'>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" width="24" height="24">
                    <path id="Logo_00000038394049246713568260000012923108920998390947_" d="M21.543,7.104c0.014,0.211,0.014,0.423,0.014,0.636  c0,6.507-4.954,14.01-14.01,14.01v-0.004C4.872,21.75,2.252,20.984,0,19.539c0.389,0.047,0.78,0.07,1.172,0.071  c2.218,0.002,4.372-0.742,6.115-2.112c-2.107-0.04-3.955-1.414-4.6-3.42c0.738,0.142,1.498,0.113,2.223-0.084  c-2.298-0.464-3.95-2.483-3.95-4.827c0-0.021,0-0.042,0-0.062c0.685,0.382,1.451,0.593,2.235,0.616  C1.031,8.276,0.363,5.398,1.67,3.148c2.5,3.076,6.189,4.946,10.148,5.145c-0.397-1.71,0.146-3.502,1.424-4.705  c1.983-1.865,5.102-1.769,6.967,0.214c1.103-0.217,2.16-0.622,3.127-1.195c-0.368,1.14-1.137,2.108-2.165,2.724  C22.148,5.214,23.101,4.953,24,4.555C23.339,5.544,22.507,6.407,21.543,7.104z"/>
                </svg>
                <label className='cursor-pointer text-[15px] m-auto text-[#050505] font-semibold'>Twitter</label>
                </div>
                <a href='https://github.com/Victorr-Hugo' className='text-[#8a8d91] cursor-pointer text-[12px] m-auto flex-row flex'>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" width="24" height="24">
                    <g>
                        <path d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387   c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416   C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237   c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93   c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23   C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23   c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921   c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576   c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"/>
                        <path d="M4.545,17.526c-0.026,0.06-0.12,0.078-0.206,0.037c-0.087-0.039-0.136-0.121-0.108-0.18   c0.026-0.061,0.12-0.078,0.207-0.037C4.525,17.384,4.575,17.466,4.545,17.526L4.545,17.526z"/>
                        <path d="M5.031,18.068c-0.057,0.053-0.169,0.028-0.245-0.055c-0.079-0.084-0.093-0.196-0.035-0.249   c0.059-0.053,0.167-0.028,0.246,0.056C5.076,17.903,5.091,18.014,5.031,18.068L5.031,18.068z"/>
                        <path d="M5.504,18.759c-0.074,0.051-0.194,0.003-0.268-0.103c-0.074-0.107-0.074-0.235,0.002-0.286   c0.074-0.051,0.193-0.005,0.268,0.101C5.579,18.579,5.579,18.707,5.504,18.759L5.504,18.759z"/>
                        <path d="M6.152,19.427c-0.066,0.073-0.206,0.053-0.308-0.046c-0.105-0.097-0.134-0.234-0.068-0.307   c0.067-0.073,0.208-0.052,0.311,0.046C6.191,19.217,6.222,19.355,6.152,19.427L6.152,19.427z"/>
                        <path d="M7.047,19.814c-0.029,0.094-0.164,0.137-0.3,0.097C6.611,19.87,6.522,19.76,6.55,19.665   c0.028-0.095,0.164-0.139,0.301-0.096C6.986,19.609,7.075,19.719,7.047,19.814L7.047,19.814z"/>
                        <path d="M8.029,19.886c0.003,0.099-0.112,0.181-0.255,0.183c-0.143,0.003-0.26-0.077-0.261-0.174c0-0.1,0.113-0.181,0.256-0.184   C7.912,19.708,8.029,19.788,8.029,19.886L8.029,19.886z"/>
                        <path d="M8.943,19.731c0.017,0.096-0.082,0.196-0.224,0.222c-0.139,0.026-0.268-0.034-0.286-0.13   c-0.017-0.099,0.084-0.198,0.223-0.224C8.797,19.574,8.925,19.632,8.943,19.731L8.943,19.731z"/>
                    </g>
                    </svg>
                    <label className='cursor-pointer text-[15px] m-auto text-[#050505] font-semibold'>GitHub</label>
                </a>
            </div>
        </div>
    </div>
  )
}