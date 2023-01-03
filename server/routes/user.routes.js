import { Router } from "express";
import { 
    getUsers, 
    getUser,
    signInUser,
    signUpUser,
    deleteUser,
    updateUser,
    getCurrentUser,
    searchUser,
} from '../controllers/user.controllers.js'

const router = Router()

router.post('/users/login', signInUser)
router.post('/users/signup', signUpUser)
router.get('/users', getUsers)
router.get('/users/:username', getUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', updateUser)
router.get('/users/current/:id', getCurrentUser)
router.post('/users/search', searchUser)

export default router