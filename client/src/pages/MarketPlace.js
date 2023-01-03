import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMarketPlace } from '../context/marketContext'

import ProductCard from '../components/ProductCard'

import Header from '../components/Header'
import NavBar from '../components/NavBar'


export const MarketPlace = () => {
  const { products } = useMarketPlace()
  const navigate = useNavigate()

  const renderProducts = () => {
    return(
      <ul>
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </ul>
    )
  }

  return (
    <div className='h-full'>
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-20'>
              <div className='w-full flex-row flex h-full'>
                <NavBar/>
                <div className='w-full h-full pl-[421px] '>
                    <div className='flex-row flex w-full'>
                        <div className='text-xl font-semibold'>All Products</div>
                        <div className='spacer w-3 h-px'></div>
                        <button onClick={() => navigate('/marketplace/create/item')} className='flex-row flex bg-[#E7F3FF] px-4 py-2 rounded-[3px] text-[#1877F2] font-semibold shadow-inner'>Create</button>
                    </div>
                    <div>
                      {renderProducts()}
                    </div>
                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}