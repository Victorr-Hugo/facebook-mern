import { Router } from "express";
import {
    getPosts,
    createPost,
    getPost,
    removePost,
    updatePost,
    likePost,
}from '../controllers/post.controllers.js'

const router = Router()

router.get('/posts', getPosts)
router.get('/posts/:id', getPost)
router.post('/posts', createPost)
router.delete('/posts/:id', removePost)
router.put('/posts/:id', updatePost)
router.post('/posts/like', likePost)


export default router