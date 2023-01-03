import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/userContext'

export const Messenger = () => {
    const navigate = useNavigate()
    const { user } = useUsers()
    const [ conversations, setConversations ] = useState([])
    const [ currentChat, setCurrentChat ] = useState(null)
    const [ messages, setMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState('')
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
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.from) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit('addUser', user._id)
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            )
        })
    }, [user])

    useEffect(() => {
        const getConversations = async() => {
            try {
                const res = await axios.get('/api/chat/' + user._id)
                setConversations(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getConversations()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('/api/chat/messages/' + currentChat?._id)
                setMessages(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const message = {
            from: user._id,
            body: newMessage,
            chatId: currentChat._id,
        }
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        )

        socket.current.emit('sendMessage', {
            from: user._id,
            receiverId,
            body: newMessage,
        })

        try {
            const res = await axios.post('/api/chat/message', message)
            setMessages([...messages, res.data])
            setNewMessage('')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

  return (
    <div className='h-full cursor-default'>
        <div className='h-full flex-col flex relative min-w-full'>
            <main className='w-full min-h-full h-full flex-col flex'>
                <div className='w-full glex-row flex h-full'>
                    <div className='bg-white z-10 px-3 w-[321px] fixed top-0 bottom-0 left-0'>
                        <div className='w-full flex-col flex py-3'>
                            <div className='flex-row flex'>
                                <div onClick={() => navigate('/')} className='h-8 w-8 cursor-pointer'>
                                    <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/512px-Facebook_Messenger_logo_2018.svg.png' className='w-full h-full'/>
                                </div>
                                <div className='spacer h-px w-4'></div>
                                <div className='text-[18px] font-medium m-0 h-full py-1'>Messenger</div>
                            </div>
                        </div>
                        <div className='spacer w-px h-4'></div>
                        <div className='w-full box-border'>
                            <div className='w-full bg-gray-100 p-2 rounded-[9px] flex-row flex'>
                                <svg className='block my-auto' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='#666'>
                                    <path d='m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z'></path>
                                </svg>
                                <div className='spacer w-4 h-px'></div>
                                <input placeholder='Search Messenger' className='bg-transparent w-full'/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex-col flex'>
                        <div className='fixed bg-white top-0 right-0 left-[315px] p-2 pl-[321px]'></div>
                    </div>
                    <div></div>
                </div>            
            </main>    
        </div>      
    </div>
  )
}

