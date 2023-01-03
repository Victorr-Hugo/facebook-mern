import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'

import Header from '../components/Header'
import NavBar from '../components/NavBar'
import GroupCard from '../components/GroupCard'

import { useUsers } from '../context/userContext'
import { useGroups } from '../context/groupContext'
import { useNavigate } from 'react-router-dom'

export const Groups = () => {
  const { user } = useUsers()
  const { groups, searchGroup } = useGroups()
  const [data, setData] = useState([])
  const [search, setSearch] = useState({
    description: '',
  })
  const navigate = useNavigate()
  
  const renderResponse = () => {
    if(data.length === 0){
      
    }else{
      return(
        <ul className='absolute w-full h-fit bg-white box-border'>
          {data.map((find) => (
            <div key={find._id} find={find} className='flex-row flex w-full py-1 my-1 px-4 cursor-pointer border-b' onClick={() => navigate('/group/' + find._id)}>
              {find.title}
            </div>
          ))}
        </ul>
      )
    }
  }

  const renderGroups = () => {
    return(
      <ul className='box-border grid-cols-2 grid gap-10'>
        {groups.map((group) => (
          <GroupCard key={group._id} group={group}/>
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
                <div className='h-full pl-[421px] relative'>
                  {renderGroups()}
                </div>
                <div id='complementary' className='bg-white shadow-md px-4 py-4 fixed right-0 top-0 bottom-0 w-1/4 pt-20'>
                  <label className='text-[#050505] font-bold text-[1.5rem] leading-[1.1667]'>Groups</label>
                  <div className='spacer w-px h-4'></div>
                  <div role='search' aria-label='Search on Odinbook' className='grow bg-[#f0f2f5]'>
                    <div className='relative'>
                      <Formik
                        initialValues={search}
                        enableReinitialize
                        onSubmit={async(values, actions) => {
                          console.log(values)
                            const res = await searchGroup(values)
                            setData(res)
                            actions.setSubmitting(false)
                        }}>
                        {({ isSubmittin, handleSubmit }) => (
                          <Form onSubmit={handleSubmit}>
                            <div className='shadow border-none text-[16px] box-border flex relative w-full rounded-[2px]'>
                              <Field name='description' placeholder='Search Odinbook' className='outline-none bg-transparent w-full  px-4 py-2 m-0 text-[#1c1e21]'/>
                              <div className='spacer w-20 h-px'></div>
                              <div className='shrink-0 bg-[#f0f2f5] py-2 items-center flex m-auto px-5 rounded-r-[2px]'>
                                <button type='submit' className='w-6 h-6'>
                                  <svg className='block m-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#666'>
                                    <path d='m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z'></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {renderResponse()}
                    </div>
                  </div>
                  <div className='spacer w-px h-5'></div>

                  <div className='w-full flex-row flex cursor-pointer'>
                    <div className='w-full py-2 px-2 bg-transparent flex-row flex'>
                      <div type='submit' className='rounded-[9px] bg-[#f0f2f5] px-2 py-2'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#050505'>
                          <path d='M23.788,21.73l-3.651-6.112c.461-.293,.913-.603,1.345-.95,.646-.519,.749-1.463,.229-2.108-.52-.647-1.466-.748-2.108-.23-.323,.26-.66,.494-1.003,.716l-3.089-5.17c.302-.562,.489-1.195,.489-1.876,0-1.675-1.036-3.107-2.5-3.703v-.797c0-.829-.672-1.5-1.5-1.5s-1.5,.671-1.5,1.5v.797c-1.464,.595-2.5,2.028-2.5,3.703,0,.682,.187,1.314,.489,1.876l-3.09,5.172c-.33-.213-.653-.439-.965-.687-.645-.516-1.591-.409-2.107,.238-.517,.648-.41,1.591,.238,2.108,.417,.333,.853,.631,1.297,.913L.212,21.73c-.425,.711-.192,1.633,.519,2.058,.241,.144,.507,.212,.769,.212,.51,0,1.008-.261,1.289-.73l3.766-6.303c1.747,.666,3.594,1.011,5.445,1.011s3.699-.345,5.447-1.011l3.766,6.303c.281,.47,.779,.73,1.289,.73,.262,0,.527-.068,.769-.212,.711-.425,.943-1.347,.519-2.058ZM10.5,6c0-.827,.672-1.5,1.5-1.5s1.5,.673,1.5,1.5-.672,1.5-1.5,1.5-1.5-.673-1.5-1.5Zm-2.385,8.353l2.717-4.547c.372,.115,.759,.194,1.168,.194s.796-.08,1.168-.194l2.716,4.546c-2.513,.838-5.255,.839-7.768,.002Z'></path>
                        </svg>
                      </div>
                      <div className='spacer w-4 h-px'></div>
                      <label className='text-[#050505] font-semibold break-words leading-[1.3333] text-[.9375rem] block my-auto cursor-pointer'>Explore</label>
                    </div>                    
                  </div>
                  <div className='spacer w-px h-5'></div>
                  <button onClick={() => navigate('/groups/create')} className='w-full py-3 bg-[#3B5990] rounded-[3px] text-white font-semibold break-words leading-[1.3333] text-[.9375rem] '>
                    Create group
                  </button>
                  <div className='w-full px-4 border-t'>
                  </div>
                </div>
              </div>
            </main>
        </div>
    </div> 
  )
}