import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [ friends, setFriends ] = useState([])
    const [ onlineFriends, setOnlineFriends ] = useState([])

    useEffect(() => {
        const getFriends = async() => {
            const res = await axios.get('/api/user/friends/' + currentId)
            setFriends(res.data)
        }
        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)))
    }, [ friends, onlineUsers ])

    const handleClick = async(user) => {
        try {
            const res = await axios.get(`/api/chat/${currentId}/${user._id}/`)
            setCurrentChat(res.data)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
      {onlineFriends.map((o) => (
        <div onClick={() => handleClick(o)}>
            <div>{o?.username}</div>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline
