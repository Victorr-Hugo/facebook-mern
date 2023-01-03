import axios from 'axios'

export const getUsersRequest = async() => await axios.get('/api/users')

export const getCurrentUser = async(id) => await axios.get('/api/users/current/' + id)
export const getUserRequest = async(username) => await axios.get('/api/users/' + username)

export const deleteUserRequest = async(id) => {
    await axios.delete('/api/users/' + id)
}

export const createUserRequest = async(user) => {
    console.log(user)
    const form = new FormData()
    for(let key in user){
        form.append(key, user[key])
    }
    return await axios.post('/api/users/signup', form , {
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
} 

export const signInUserRequest = async(user) => {
    const form = new FormData()
    for(let key in user){
        form.append(key, user[key])
    }
    return await axios.post('/api/users/login', form,{
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}

export const searchUserRequest = async(search) => {
    console.log(search)
    const form = new FormData()
    for(let key in search){
        form.append(key, search[key])
    }
    return await axios.post('/api/users/search', form,{
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}

export const sendFriendFormRequest = async(friend) => {
    const form = new FormData()
    for(let key in friend){
        form.append(key, friend[key])
    }
    return await axios.post('/api/friends/send', form,{
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}

export const getFriendsRequests = async(friends) => {
    const form = new FormData()
    for(let key in friends){
        form.append(key, friends[key])
    }
    return await axios.post('/api/friends', form,{
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}

export const resFriendRequest = async (friends) => {
    const form = new FormData()
    for(let key in friends){
        form.append(key, friends[key])
    }
    return await axios.post('/api/friends/response', form,{
        headers:{
            "Content-Type": "multipart/form-data",            
        }
    })
}