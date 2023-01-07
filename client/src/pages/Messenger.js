import React, { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/userContext'

import axios from 'axios'
import ChatOnline from '../components/ChatOnline'
import Conversation from '../components/Conversation'
import Header from '../components/Header'
import MessageForm from '../components/MessageForm'
import MessageCard from '../components/MessageCard'
import { useChats } from '../context/chatContext'

export const Messenger = () => {
    const navigate = useNavigate()
    const { user } = useUsers()
    const { chat, sendMessage, previousMessages } = useChats()
    const [ messages, setMessages ] = useState([])
    const [message, setMessage] = useState('')
    const [ arrivalMessage, setArrivalMessage ] = useState(null)
    const [ onlineUsers, setOnlineUsers ] = useState([])
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:4000')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                from: data.from,
                body: data.body,
                cratedAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
        chat?.users.includes(arrivalMessage.from) &&
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, chat])

    useEffect(() => {
        socket.current.emit('addUser', user._id)
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(
                user.friends?.filter((f) => users.some((u) => u.userId === f))
            )
        })
    }, [user])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(event.key === 'Enter'){
            const newMessage = {
                from: user._id,
                body: message,
                chatId: chat?._id
            }
            console.log(newMessage)
            const receiverId = chat?.users?.find(
                (user) => user !== user._id
            )
                
            socket.current.emit('sendMessage', {
                from: user._id,
                receiverId,
                body: message,
            })   

            try {
                const res = await sendMessage(newMessage)
                setMessages([...messages, res.data])
                setMessage('')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
    <div className=''>
        <Header/>
        <div className='h-full  cursor-default flex-col flex relative min-w-full z-10'>
            <main className='w-full min-h-full h-full flex-col flex'>
                <div className='w-full glex-row flex h-full'>
                    <div className='bg-white px-3 w-[321px] fixed top-[60px] bottom-0 left-0 border-b border-b-black'>
                        <div className='spacer w-px h-3'></div>
                        <div className='text-[28px] font-semibold'>Chats</div>
                        <div className='spacer w-px h-4'></div>
                        <div className='w-full box-border bg-[#f0f2f5]  rounded-[50px]'>
                            <div className='w-full bg-black-100 p-1 rounded-[9px] flex-row flex'>
                                <svg className='block my-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#666'>
                                    <path d='m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z'></path>
                                </svg>
                                <div className='spacer w-4 h-px'></div>
                                <input placeholder='Search Messenger' className='bg-transparent w-full'/>
             
                            </div>
                        </div>
                        <div className='spacer w-px h-4'></div>
                        <div>
                            {user.friends?.map((friend) => (
                                <Conversation key={friend._id} friend={friend} currentUser={user}/>
                            ))}
                        </div>
                    </div>
                    <div className='w-full box-border h-full flex-col flex pt-14 pl-[320px] border-x'>
                        <div className='bg-white p-2 shadow flex-row flex'>
                            {chat?.users.map((userchat) => {
                                if(userchat._id !== user._id){
                                    return(
                                        <div key={userchat._id} className='p-3 flex-row flex hover:bg-[#F0F2F5] w-fit rounded-[9px] cursor-pointer'>
                                            <img alt='' src={userchat.image?.url} className='w-10 h-10 rounded-full object-cover'/>
                                            <div className='spacer w-4 h-px'></div>
                                            <div className='text-[22px] font-semibold'>{userchat.firstname} {userchat.lastname}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className='w-fit h-fit'>
                            { chat? (
                            <div className='w-fit h-fit'>
                                <div>
                                    {previousMessages.map((previous) => (
                                       <div ref={scrollRef} key={previous?._id}> 
                                            <MessageCard  message={previous} />
                                        </div>
                                    ))}
                                </div>
                                {messages.map((message) => (
                                    <div ref={scrollRef} key={message?._id}> 
                                        <MessageCard  message={message} />
                                    </div>
                                ))}
                            </div>
                            ):(
                            <div></div>
                            ) }

                        </div>

                        <div className='bg-white z-20 p-4 fixed bottom-0 left-[314px] right-0 '>
                            <div className='w-full flex-row flex px-10'>
                                <input placeholder='Send Message' className='bg-[#F0F2F5] rounded-[50px] p-2 px-5 text-[#050505] w-full' onChange={(e) => setMessage(e.target.value)} onKeyUp={handleSubmit}  value={message} />
                            </div>      
                        </div>
                    </div>
                </div>            
            </main>    
        </div>      
    </div>
  )
}

