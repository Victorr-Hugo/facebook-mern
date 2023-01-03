import { createContext, useContext, useEffect, useState } from "react";
import {
    createPostRequest,
    getPostsRequest,
    likePostRequest,
    createCommentRequest,
    sharePostRequest,
    getPostRequest,
} from '../api/posts'

const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    if(!context) throw new Error('Post provider is missing')
    return context
}

export const PostProvider = ({ children }) => {
    const[posts, setPosts] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await getPostsRequest()
            setPosts(res.data)
        })()
    },[])

    const openForm = (value) => {
        setModal(value)
    }

    const getPost = async(id) => {
        try {
            const res = await getPostRequest(id)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const createPost = async(post) => {
        try {
            console.log(post)
            const res = await createPostRequest(post)
            setPosts([...posts, res.data])
        } catch (error) {
            console.error(error)
        }
    }

    const likePost = async(postLiked) => {
        try {
            console.log(postLiked)
            const res = await likePostRequest(postLiked)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    const createComment = async(comment) => {
        try {
            const res = await createCommentRequest(comment)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    const sharePost = async(sharedPost) => {
        try {
            const res = await sharePostRequest(sharedPost)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }


    return(
        <postContext.Provider value={{ modal, openForm, posts, createPost, likePost, createComment, sharePost, getPost }}>
            {children}
        </postContext.Provider>
    )
}