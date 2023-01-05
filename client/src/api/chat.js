import axios from 'axios'

export const searchChatRequest = async (firstUser, secondUser) => await axios.get(`/api/chat/${firstUser}/${secondUser}`)

export const createChatRequest = async(senderId , receiverId) => {
    return await axios.post(`/api/chat/create/${senderId}/${receiverId}`)
}

export const createMessageRequest = async(newMessage) => {
    const form = new FormData()
    for(let key in newMessage){
        form.append(key, newMessage[key])
    }
    return await axios.post('/api/chat/message', form , {
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}

export const getMessagesRequest = async(id) => await axios.get('/api/chat/messages/' + id)

