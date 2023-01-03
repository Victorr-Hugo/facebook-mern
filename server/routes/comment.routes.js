import { Router } from "express";
import {
    createComment,
    likeComment,
    removeComment,
}from '../controllers/comment.controllers.js'

const router = Router()

router.post('/comments', createComment)
router.put('/comments/like', likeComment)
router.delete('/comments/:id', removeComment)


export default router