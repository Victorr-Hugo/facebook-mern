import Chat from '../models/Chat.js'
import User from '../models/User.js'
import Message from '../models/Message.js'

import fs from 'fs-extra'

import { API_KEY, API_SECRET, CLOUD_NAME } from '../config.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});


const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "odin_book/posts",
  });
};

export const getUserChat = async(req, res) => {
    try {
        const { id } = req.params
        const chat = await Chat.find({
            users:{
                $in: [id]
            }
        }).populate('users')
        if(!chat) return res.status(400).message('Chat not found')
        res.status(200).json(chat)
    } catch (error) {
        return res.status(500).json({ message: error.message })            
    }
}

export const searchChat = async(req, res) =>{
    try {
        const { firstUser, secondUser } = req.params
        const chat = await Chat.findOne({
            users:{
                $all:[firstUser, secondUser]
            }
        }).populate('users').populate('messages')
        if(!chat) {
            const newChat = new Chat({
                users:[
                    firstUser,
                    secondUser,
                ]
            })
            await newChat.save()
            return res.json(newChat)
        }else{
            return res.status(200).json(chat)

        }
    } catch (error) {
        return res.status(500).json({ message: error.message })            
    }
}

export const createMessage = async(req, res) => {
    try {
        const { from, body, chatId } = req.body
        let image = null

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        }

        const newMessage = new Message({from, body, image, chatId})
        await newMessage.save()
        await Chat.findByIdAndUpdate(
            chatId,
            {
                $push:{
                    messages: newMessage._id,
                  }
            }
        )
        return res.status(200).json(newMessage)

    } catch (error) {
        return res.status(500).json({ message: error.message })            
    }
}

export const getMessages = async(req, res) => {
    try {
        const { id } = req.params
        const chat = await Chat.findById(id)
        if (!chat) return res.status(404).json({ message: 'Messages Not Found' })
        return res.status(200).json(chat)
    } catch (error) {
        return res.status(500).json({ message: error.message })            
    }
}