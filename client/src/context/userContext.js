import React, { createContext, useReducer, useEffect, useContext, useState } from 'react'
import { 
    createUserRequest, 
    deleteUserRequest, 
    getCurrentUser, 
    getUsersRequest, 
    signInUserRequest,
    searchUserRequest,
    getUserRequest,
    sendFriendFormRequest,
    getFriendsRequests,
    resFriendRequest,
} from '../api/users'

export const authReducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}
const UserContext = createContext()
export const useUsers = () => {
    const context = useContext(UserContext)
    if(!context) throw new Error('Auth Provider is missing')
    return context
}


export const UserProvider = ({ children }) => {
    const [ users, setUsers ] = useState([])
    const [ friends, setFriends ] = useState([])
    const [ user, setUser ] = useState({})
    const [ state, dispatch ] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        (async () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if(user){
                dispatch({ type: 'LOGIN', payload: user })
                const id = user.user
                const res = await getCurrentUser(id)
                setUser(res.data)
            }
        })()
    }, [user])

    useEffect(() => {
        (async() => {
            const res = await getUsersRequest()
            setUsers(res.data)
        })()
    }, [])

    const deleteUser = async(id) => {
        try {
            const res = await deleteUserRequest(id)
            if(res.status === 204){
                setUsers(users.filter((user) => user._id !== id))
            }
        } catch (error) {
            console.error(error)            
        }
    }

    const getUser = async(username) => {
        try {
            const res = await getUserRequest(username)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    const createUser= async(user) => {
        try {
            const res = await createUserRequest(user)
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({ type: 'LOGIN', payload: res.data })
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const signUser = async(user) => {
        try {
            const res = await signInUserRequest(user)
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({ type: 'LOGIN', payload: res.data })
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const searchUser = async(search) => {
        try {
            const res = await searchUserRequest(search)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    const sendFriendForm = async(friend) => {
        try {
            console.log(friend)
            const res = await sendFriendFormRequest(friend)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    const getFriendsRequest = async(friends) => {
        try {
            const res = await getFriendsRequests(friends)
            setFriends(res.data)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const acceptFriendForm = async(friends) => {
        try {
            const res = await resFriendRequest(friends)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <UserContext.Provider value={{...state, dispatch, users, getUser, createUser, signUser, deleteUser, user, searchUser, sendFriendForm, getFriendsRequest, friends, acceptFriendForm }}>
            {children}
        </UserContext.Provider>
    )

}