import { Router } from "express";
import {
    sendFriendRequest,
    resFriendRequest,
}from '../controllers/friend_request.controllers.js'

const router = Router()

router.post('/friends/send', sendFriendRequest)
router.post('/friends/response', resFriendRequest)


export default router