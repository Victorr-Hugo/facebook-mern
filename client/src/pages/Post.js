import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

export const Post = () => {
  return (
    <div className='h-full'>
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-24'>
              <div className='w-full flex-row flex h-full'>
                <NavBar/>
                <div className='w-full h-full pl-[321px] '>


                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}
