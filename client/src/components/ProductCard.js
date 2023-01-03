import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({product}) => {
    const navigate = useNavigate()
  return (
    <div onClick={()=> navigate('/marketplace/item/' + product._id)} className='min-w-[242px] max-w-[381px] p-4 flex-col box-border flex shrink cursor-pointer'>
        <div className='flex-col flex w-full shadow-md'>
            <img alt='' src={product.image1?.url} className='min-h-[242px] max-h-[381px] object-cover rounded-[5px]'/>    
            <div className='w-full flex-col flex px-5 py-2 bg-white rounded-[5px]'>
              <span className='text-[20px] font-semibold'>${product.price}</span>
              <span className='text-[16px]'>{product.title}</span>
              <span className='text-[16px] text-neutral-800'>{product.description}</span>
            </div>
        </div>      
    </div>
  )
}

export default ProductCard
