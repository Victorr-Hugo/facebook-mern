import { Router } from "express";
import {
    getUserChat,
    searchChat,
    createMessage,
    getMessages,
}from '../controllers/chat.controllers.js'
const router = Router()

router.get('/chat/:id', getUserChat)
router.get('/chat/:firstUser/:secondUser', searchChat)

router.post('/chat/message', createMessage)
router.get('/chat/messages/:id', getMessages)

export default router