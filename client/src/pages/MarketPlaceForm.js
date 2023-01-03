import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/userContext'
import { useMarketPlace } from '../context/marketContext'

import Header from '../components/Header'
import NavBar from '../components/NavBar'

export const MarketPlaceForm = () => {
    const { user } = useUsers()
    const { createProduct } = useMarketPlace()
    const navigate = useNavigate()
    const [ product, setProduct ] = useState({
        author: user._id, 
        description: '', 
        price: '', 
        title: '',
        image1: null, 
        image2: null,
    })

  return (
    <div className='h-full'>
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-20'>
                <div className='w-full flex-row flex h-full'>
                    <NavBar user={user}/>
                    <div className='w-full h-full pl-[421px] '>
                        <div className='w-full table-cell text-center align-middle'>
                            <div className='m-5 text-left inline-block relative'>
                                <div className='p-0 w-[542x] text-[#1c1e21] bg-white box-border px-4 py-[10px] relative rounded-[8px] shadow-lg'>
                                    <div className='flex-col flex w-full'>
                                        <div className='w-px spacer h-6'></div>
                                        <span className='text-[.8125rem] font-normal text-[#65676B] leading-[1.2308]'>Marketplace</span>
                                        <span className='block font-bold text-[#050505] text-[1.5rem] leading-[1.1667]'>Product for sale</span>
                                        <div className='spacer w-px h-4'></div>
                                        <div className='flex-row flex w-full'>
                                            <img alt='' src={user.image?.url} className='w-10 h-10 min-w-[40px] min-h-[40px] rounded-full object-cover'/>
                                            <div className='spacer w-4 h-px'></div>
                                            <div className='flex-col flex w-full'>
                                                <span className='block font-semibold leading-[1.333] text-[#050505] text-[.9375rem]'>{user.firstname} {user.lastname}</span>
                                                <span className='box-border font-normal text-[.8125rem] text-[#65676B]'>Create on Marketplace</span>
                                            </div>
                                        </div>
                                        <div className='spacer w-px h-3'></div>
                                        <Formik
                                        initialValues={product}
                                        enableReinitialize
                                        onSubmit={async(values, actions) => {
                                            await createProduct(values)
                                            actions.resetForm()
                                            actions.setSubmitting(false)
                                            navigate('/marketplace')
                                        }}>
                                            {({ setFieldValue, isSubmitting, handleSubmit }) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <div className='flex-row flex w-full'>
                                                        <div className='w-1/2'>
                                                            <div className="flex items-center justify-center w-full">
                                                                <label htmlFor="dropzone-file-1" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload the first photo</span> </p>
                                                                    </div>
                                                                    <input type='file' name='image1' id='dropzone-file-1' className='hidden' onChange={(e) => setFieldValue('image1', e.target.files[0])}/>
                                                                </label>
                                                            </div> 
                                                        </div>
                                                        <div className='spacer h-px w-2'></div>
                                                        <div className='w-1/2'>
                                                        <div className="flex items-center justify-center w-full">
                                                                <label htmlFor="dropzone-file-2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload the second photo</span> </p>
                                                                        
                                                                    </div>
                                                                    <input type='file' name='image2' id='dropzone-file-2' className='hidden' onChange={(e) => setFieldValue('image2', e.target.files[0])}/>

                                                                </label>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                    <div className='w-px spacer h-3'></div>
                                                    <Field name='title' placeholder='Title' className='rounded-[6px] border px-4 py-[10px] w-full box-border text-[#050505] outline-none text-ellipsis block placeholder:text-[#65676B] border-neutral-400' />
                                                    <div className='w-px spacer h-3'></div>
                                                    <Field name='price' placeholder='Price' className='rounded-[6px] border px-4 py-[10px] w-full box-border text-[#050505] outline-none text-ellipsis block placeholder:text-[#65676B] border-neutral-400' />
                                                    <div className='w-px spacer h-3'></div>
                                                    <Field name='description' placeholder='Description' type='textarea' className='rounded-[6px] border px-4 py-[10px] w-full box-border text-[#050505] outline-none text-ellipsis block placeholder:text-[#65676B] border-neutral-400 h-[76px] ' />
                                                    <div className='w-px spacer h-10'></div>
                                                    <button type='submit' className=' w-full py-2 bg-[#3B5990] text-white rounded-[4px] text-[15px]'>Submit</button>
                                                    <div className='w-px spacer h-10'></div>

                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
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
