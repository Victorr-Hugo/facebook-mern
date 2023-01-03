import { createContext, useContext, useEffect, useState } from 'react'
import {
    getGroupRequest,
    getGroupsRequest,
    createGroupRequest,
    joinGroupRequest,
    searchGroupRequest,
    createGroupPostRequest,
} from '../api/group'

const groupContext = createContext()

export const useGroups = () => {
    const context = useContext(groupContext)
    if(!context) throw new Error('Groups provider is missing')
    return context
}

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        (async() => {
            const res = await getGroupsRequest()
            setGroups(res.data)
        })()
    },[])

    const createGroup = async(group) => {
        try {
            const res = await createGroupRequest(group)
            setGroups([ ...groups, res.data ])
        } catch (error) {
            console.error(error)            
        }
    }
    
    const getGroup = async(id) => {
        try {
            const res = await getGroupRequest(id)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const joinGroup = async(groupJoined) => {
        try {
            const res = await joinGroupRequest(groupJoined)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const searchGroup = async(search) => {
        try {
            const res = await searchGroupRequest(search)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }
    const createGroupPost = async(post) => {
        try {
            const res = await createGroupPostRequest(post)
            return res.data
        } catch (error) {
            console.error(error.response)            
        }
    }
    return(
        <groupContext.Provider value={{ groups, createGroup, getGroup, joinGroup, searchGroup, createGroupPost }}>
            { children }
        </groupContext.Provider>
    )
}