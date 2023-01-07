import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import fileUpload from 'express-fileupload'
import cors from 'cors'

import userRouter from './routes/user.routes.js'
import friendRequestRouter from './routes/friend_request.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comment.routes.js'
import chatRouter from './routes/chat.routes.js'
import marketPlaceRouter from './routes/marketplace.routes.js'
import groupRouter from './routes/group.routes.js'

const app = express()
const httpServer = createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
    fileUpload({
        tempFileDir: './upload',
        useTempFiles: true,
    })
)

app.use('/api', userRouter)
app.use('/api', friendRequestRouter)
app.use('/api', postRouter)
app.use('/api', commentRouter)
app.use('/api', chatRouter)
app.use('/api', marketPlaceRouter)
app.use('/api', groupRouter)
app.use('/api', chatRouter)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    console.log(users)
    return users.find((user) => user.userId === userId)
}

io.on('connection',(socket) => {
    console.log('user connected')
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ from, to, body }) => {
        const user = getUser(from)
        io.to(user.socketId).emit('getMessage', {
            from,
            body,
        })
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})



export { app, httpServer }