import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useGroups } from '../context/groupContext'
import { useUsers } from '../context/userContext'

const CreateGroupForm = () => {
    const { user } = useUsers()
    const { createGroup } = useGroups()
    const navigate = useNavigate()
    const [ group, setGroup ] = useState({
        title:'',
        id: user._id,
        image: null,
        banner: null,
    })

  return (
    <div className='w-full h-full px-20 py-20'>
        <div className='flex-col flex w-full shadow-md bg-white'>
            <div className="flex flex-col items-center justify-center w-full">
                <Formik
                initialValues={group}
                enableReinitialize
                onSubmit={async(values, actions) => {
                    await createGroup(values)
                    actions.resetForm()
                    actions.setSubmitting(false)
                    navigate('/groups')
                }}>
                    {({ setFieldValue, isSubmitting,handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className='flex-col flex w-full px-10 py-10'>
                            <div className='w-full flex-row flex'>
                            <label htmlFor="dropzone-banner" className="flex flex-col items-start justify-center h-fit w-fit px-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ">
                                <div className="flex  flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="text-gray-400 block m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload the group banner</span> 
                                        </p>
                                    <div className='spacer w-px h-2'></div>
                                </div>
                                <input type='file' name='banner' id='dropzone-banner' className='hidden' onChange={(e) => setFieldValue('banner', e.target.files[0])}/>
                            </label>
                            <div className='spacer h-px w-10'></div>
                            <label htmlFor="dropzone-file" className="flex flex-col items-start justify-center h-fit w-fit px-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ">
                                <div className="flex  flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="text-gray-400 block m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload the group image</span> 
                                        </p>
                                    <div className='spacer w-px h-2'></div>
                                </div>
                                <input type='file' name='image' id='dropzone-file' className='hidden' onChange={(e) => setFieldValue('image', e.target.files[0])}/>
                            </label>
                            </div>
                            <div className='spacer h-5 w-px'></div>
                            <div className='flex-col flex w-[231px]'>
                                <Field name='title' placeholder='Name of the group' className='box-border  px-4 py-2 text-[#050505] outline-none leading-[1.25] border-[#606776] border rounded-[4px] placeholder:text-[#606776]'/>
                                <div className='spacer w-px h-1'></div>
                                <button type='submit' className=' w-full py-2 bg-[#3B5990] text-white rounded-[4px] text-[15px]'>Create group</button>   
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className='w-full flex-col flex cursor-not-allowed'>
                    <div className='w-full px-10 py-2 flex-col flex'>
                        <div className='border border-neutral-300'></div>
                        <div className='spacer w-px h-4'></div>
                        <div className='grid-cols-3 grid gap-3 '>
                            <label className='block m-auto text-[#666] text-[1.265rem] font-semibold leading-[1.25]'>About</label>
                            <label className='block m-auto text-[#666] text-[1.265rem] font-semibold leading-[1.25]'>Feed</label>
                            <label className='block m-auto text-[#666] text-[1.265rem] font-semibold leading-[1.25]'>Members</label>
                        </div>
                        <div className='w-full py-2 shadow-b'></div>
                    </div>
                    <div className='w-full bg-white px-10 py-2'>
                        <div className='w-full px-w py-2 bg-[#f0f2f5] shadow-inner'>
                            <div className='py-2 px-10 w-full'>
                                <div className='w-full border border-[#f0f2f5] shadow rounded-md p-4 bg-slate-100 text-lg font-semibold text-slate-400'>
                                    About
                                </div>
                            </div>
                            <div className='w-full px-10 py-3 flex-row flex'>
                                <div className='w-1/2'>
                                    <div className='border border-slate-200 shadow-md rounded-md p-4'>
                                        <div className='flex-row flex w-full'>
                                            <img alt='' src={user.image?.url} className='w-10 h-10 min-w-[40px] min-h-[40px] rounded-full grayscale opacity-50'/>
                                            <div className='spacer w-2 h-px'></div>
                                            <div className='px-1'>
                                                <div className='w-full px-4 py-1 rounded-[50px] bg-slate-200 text-lg font-semibold text-slate-400'>
                                                    Post your ideas, {user.firstname}
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                                <div className='spacer w-4 h-px'></div>
                                <div className='w-1/2'>
                                    <div className="border border-slate-200 shadow-md rounded-md p-4 py-10 px-10">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                                <div className="flex-1 space-y-6 py-1">
                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                        </div>
                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='spacer w-px h-2'></div>
                                    <div className="border border-slate-200 shadow-md rounded-md p-4 py-10 px-10">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                                <div className="flex-1 space-y-6 py-1">
                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                        </div>
                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default CreateGroupForm
