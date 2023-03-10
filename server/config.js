import { config } from 'dotenv'
config()

export const MONGODB_URI = process.env.MONGODB_URI 

export const PORT = process.env.PORT

export const CLOUD_NAME = process.env.CLOUD_NAME
export const API_KEY = process.env.API_KEY
export const API_SECRET = process.env.API_SECRET 

export const KRABBI_PATTY_SECRET = process.env.KRABBI_PATTY_SECRET