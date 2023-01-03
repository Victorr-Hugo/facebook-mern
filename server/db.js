import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

export const connectDB = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URI)
    } catch (error) {
        console.error(error)
    }
}

mongoose.connection.on('connected', () => {
    console.log('mongodb is running')
})