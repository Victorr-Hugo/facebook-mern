import axios from 'axios'

export const searchChatRequest = async (firstUser, secondUser) => await axios.get(`/api/chat/${firstUser}/${secondUser}`)

export const createChatRequest = async(senderId , receiverId) => {
    return await axios.post(`/api/chat/create/${senderId}/${receiverId}`)
}

export const createMessageRequest = async(message) => {
    const form = new FormData()
    for(let key in message){
        form.append(key, message[key])
    }
    return await axios.post('/api/chat/message', form , {
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}

export const getMessagesRequest = async(id) => await axios.get('/api/chat/messages/' + id)

