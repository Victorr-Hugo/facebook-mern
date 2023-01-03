import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

import CreateGroupForm from '../components/CreateGroupForm'

export const CreateGroup = () => {
  return (
    <div className='h-full'>
        <div className='h-full flex relative min-w-full flex-col'>
            <Header/>
            <main className='pt-24'>
              <div className='w-full flex-row flex h-full'>
                <NavBar/>
                <div className='w-full h-full pl-[321px] '>
                    <CreateGroupForm/>
                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}

{/*https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png */}