import { Router } from "express";
import {
    createGroup,
    joinGroup,
    createPost,
    getGroups,
    getGroup,
    searchGroup,
    removeGroup,
}from '../controllers/group.controllers.js'
const router = Router()

router.post('/groups', createGroup)
router.post('/groups/join', joinGroup)
router.post('/groups/post', createPost)
router.get('/groups', getGroups)
router.get('/groups/:id', getGroup)
router.post('/groups/search', searchGroup)
router.delete('/groups/:id', removeGroup)

export default router