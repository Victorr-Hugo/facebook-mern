import { createContext, useContext, useEffect, useState } from 'react'
import { createChatRequest, createMessageRequest, getMessagesRequest, searchChatRequest } from '../api/chat'

const chatContext = createContext()

export const useChats = () => {
    const context = useContext(chatContext)
    if(!context) throw new Error('Chats provider is missing')
    return context
}

export const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState(null)

    const searchChat = async(firstUser, secondUser) => {
        try {
            const res = await searchChatRequest(firstUser, secondUser)
            setChat(res.data)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const sendMessage = async(newMessage) => {
        try {
            const res = await createMessageRequest(newMessage)
            return res.data        
        } catch (error) {
            console.error(error)
        }
    }

    const getMessages = async(id) => {
        try {
            const res = await getMessagesRequest(id)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    return(
        <chatContext.Provider value={{ chat, searchChat, getMessages, sendMessage  }}>
            { children }
        </chatContext.Provider>
    )
}