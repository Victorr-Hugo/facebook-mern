import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageCard = ({page}) => {
    const navigate = useNavigate()
  return (
    <div className='w-fit box-border shadow-md'>
        <div className='p3'>
            <div onClick={() => navigate('/page/' + page._id)} className='relative cursor-pointer'>
                <div className='w-[279px] h-[119px] relative'>
                    <img alt='' src={page.banner?.url} className='w-full h-full min-w-[279px] min-h-[119px] object-cover'/>
                    <div className='absolute right-1/2 bottom-[-9px] w-20 h-20 '>
                        <img alt='' src={page.image?.url} className='w-full h-full rounded-full object-cover border-[4px] border-white shadow-md'/>
                    </div>
                </div>
                <div className='bg-white w-full px-3 py-2 rounded-b-[4px] flex-col flex'>
                    <span className='text-[17px] font-semibold'>{page.title}</span>
                    <span className='text-[#65676B] font-normal leading-[1.3333] text-[14px]'>{page.likes?.length} members</span>
                    <div className='spacer w-px h-2'></div>
                    <div className='px-2 py-1 w-full'>
                        <button className='w-fit px-20 flex-row flex py-1 bg-[#E4E6EB]'>
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 25 25" width="25" height="25" fill='#8a8e92' className='block m-auto'>
                                    <path d="M6,8H3a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H6Z"/>
                                    <path d="M14,8l.555-3.328a2.269,2.269,0,0,0-1.264-2.486,2.247,2.247,0,0,0-2.9,1.037L8,8V22H22l2-11V8Z"/>
                                </svg>
                            </div>
                            <div className='spacer w-2 h-xpx'></div>
                            <span className='text-[16px] text-left my-auto text-[#8a8e92]'>Like</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageCard
