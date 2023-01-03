import { Router } from "express";
import {
    getPost,
    getProducts,
    createProduct,
    createComment,
    updatePost,
    removePost,
    likeProduct,
}from '../controllers/product.controllers.js'

const router = Router()

router.get('/marketplace', getProducts)
router.get('/marketplace/:id', getPost)
router.post('/marketplace', createProduct)
router.delete('/marketplace/:id', removePost)
router.put('/marketplace/:id', updatePost)
router.post('/marketplace/comment', createComment)
router.post('/marketplace/like', likeProduct)


export default router