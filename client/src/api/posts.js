import axios from 'axios'

export const getPostsRequest = async() => await axios.get('/api/posts')

export const getPostRequest = async(id) => await axios.get('/api/posts/' + id)

export const createPostRequest = async(post) => {
    console.log(post)
    const form  = new FormData()
    for(let key in post){
        form.append(key, post[key])
    }
    return await axios.post('/api/posts', form, {
        headers:{
            "Content-Type": "multipart/form-data",        
        }
    })
}

export const likePostRequest = async(postLiked) => {
    const form = new FormData()
    for(let key in postLiked){
        form.append(key, postLiked[key])
    }
    return await axios.post('/api/posts/like', form, {
        headers:{
            "Content-Type": "multipart/form-data",        
        }
    })
}

export const createCommentRequest = async(comment) => {
    const form = new FormData()
    for(let key in comment){
        form.append(key, comment[key])
    }
    return await axios.post('/api/comments', form, {
        headers:{
            "Content-Type": "multipart/form-data",        
        }
    })
}

export const sharePostRequest = async(sharedPost) => {
    const form = new FormData()
    for(let key in sharedPost){
        form.append(key, sharedPost[key])
    }
    return await axios.post('/api/share', form, {
        headers:{
            "Content-Type": "multipart/form-data",        
        }
    })
}