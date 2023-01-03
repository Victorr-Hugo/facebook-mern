import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useUsers } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const { createUser } = useUsers()
    const navigate = useNavigate()
    const [ user, setUser ] = useState({
        firstname:'',
        lastname:'',
        username:'',
        email:'',
        password:'',
        image: null,
        banner: null,
    })
  return (
    <div className='w-full h-full bg-white bg-opacity-50 table table-fixed absolute z-[200] top-0 left-0 right-0'>
        <div className='w-full table-cell text-center align-middle'>
            <div className='m-5 text-left inline-block relative'>
                <div className='p-0 w-[432px] text-[#1c1e21] bg-white box-border px-4 py-[10px] relative rounded-[8px] z-[500] shadow-lg'>
                    <div className='w-full h-full flex-row flex'>
                        <div className='flex-col flex w-full'>
                            <span className='text-[32px] leading-[38px] font-semibold'>Sign Up</span>
                            <div className='spacer w-px h-4'></div>
                            <span className='text-[#606770] text-[15px] leading-[24px]'>It's quick and easy</span>
                        </div>
                        <div onClick={() => navigate('/')} className='p-2 cursor-pointer'>
                            <svg xmlns='http://www.w3.org/2000/svg' id='Isolation_Mode' data-name='Isolation Mode' viewBox='0 0 24 24' width='20' height='20'>
                                <polygon points='24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061'></polygon>
                            </svg>
                        </div>
                    </div>
                    <div className='spacer w-px h-2'></div>
                    <div className='border-t border-t-solid border-t-[#dadde1]'>
                        {/*firstname, lastname, username, email, password, image */}
                        <Formik
                        initialValues={user}
                        enableReinitialize
                        onSubmit={async(values, actions) => {
                            await createUser(values)
                            actions.resetForm()
                            actions.setSubmitting(false)
                            navigate('/')
                        }}>
                            {({ setFieldValue, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit} className='w-full box-border px-3'>
                                <div className='spacer w-px h-4'></div>
                                <input type='file' name='image' onChange={(e) => setFieldValue('image', e.target.files[0])}/>
                                <div className='spacer w-px h-2'></div>
                                <input type='file' name='banner' onChange={(e) => setFieldValue('banner', e.target.files[0])}/>
                                <div className='spacer w-px h-2'></div>
                                <div className='flex-row flex w-full'>
                                    <Field name='firstname' placeholder='First Name' className='p-[11px] text-[15px] leading-[16px] border rounded-[5px] border-[#ccd0d5] w-1/2'/>
                                    <div className='spacer w-2 h-px'></div>
                                    <Field name='lastname' placeholder='Last Name' className='p-[11px] text-[15px] leading-[16px] border rounded-[5px] border-[#ccd0d5] w-1/2'/>
                                </div>
                                <div className='spacer w-px h-2'></div>
                                <Field name='username' placeholder='Username' className='p-[11px] text-[15px] leading-[16px] border rounded-[5px] border-[#ccd0d5] w-full'/>
                                <div className='spacer w-px h-2'></div>
                                <Field name='email' placeholder='Email' className='p-[11px] text-[15px] leading-[16px] border rounded-[5px] border-[#ccd0d5] w-full'/>
                                <div className='spacer w-px h-2'></div>
                                <Field name='password' placeholder='Password' className='p-[11px] text-[15px] leading-[16px] border rounded-[5px] border-[#ccd0d5] w-full'/>
                                <div className='spacer w-px h-5'></div>
                                <div className='text-center'>
                                    <button type='submit' className='bg-[#00a400] rounded-[6px] text-white text-[18px] h-[36px] px-[32px] font-semibold'>Sign Up</button>
                                </div>
                                <div className='spacer w-px h-10'></div>
                            </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpForm
