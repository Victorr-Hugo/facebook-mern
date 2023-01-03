import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fs from 'fs-extra'
import { API_KEY, API_SECRET, CLOUD_NAME, KRABBI_PATTY_SECRET } from '../config.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "odin_book/users",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};


const createToken = (_id) => {
    return jwt.sign({ _id }, KRABBI_PATTY_SECRET, { expiresIn: '7d' })
}

export const getCurrentUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate('friends').populate('chats').populate({
            path: 'posts',
            populate: {
              path : 'author'
            }
          }).populate('groups').populate({
            path: 'friendsRequests',
            populate:[{
                path:'from'
            },
            {
                path:'to'
            }]
        })
        return res.json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const signInUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(user){
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                return res.status(500).json({ message: 'Incorrect password' })
            }else{
                const token = createToken(user._id)
                res.status(200).json({user:user._id, token})
            }
        }else{
            return res.status(404).json({ message: 'User not found'  })            
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const signUpUser = async(req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body
        console.log(firstname, lastname, username, email, password)
        let image = null
        let banner = null
        const userExists = await User.findOne({ email })

        if(userExists) return res.status(500).json({ message: 'Email has already been used' })
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        if(req.files?.banner){
            const result = await uploadImage(req.files.banner.tempFilePath)
            await fs.remove(req.files.banner.tempFilePath)
            banner = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const user = new User({ firstname, lastname, username, email, password: hash, image, banner })

        await user.save()
        const token = createToken(user._id)
        res.status(200).json({ user:user._id, token })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async(req, res) => {
    try {
        const { id }  = req.params
        const user = await User.findByIdAndDelete(id)

        if(user && user.image.public_id){
            await deleteImage(user.image.public_id)
        }

        if(!user) return res.status(404).json({ message: 'User not found' })
        res.sendStatus(200)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const updateUser = async(req, res) => {
    try {
        const { id } = req.params
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            req.body.image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
            }        
        )        
        return res.json(updatedUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getUser = async(req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({
            username: {
                $regex: username, $options: 'i'
            }
        }).populate('friends').populate('chats').populate({ path: 'posts', populate: { path : 'author' } 
        }).populate('groups').populate({
            path: 'friendsRequests',
            populate:[{
                path:'from'
            },
            {
                path:'to'
            }]
        })
        if(!user){ 
            return res.status(404).json({ message: 'User not found' })
        }else{
            return res.json(user)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.find({}).populate('friends').populate('posts').populate('chats').populate('groups').populate({
            path: 'friendsRequests',
            populate:[{
                path:'from'
            },
            {
                path:'to'
            }]
        })
        return res.json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const searchUser = async(req, res) => {
    try {
        const { description } = req.body
        const user = await User.find({
            firstname: {
                $regex: description, $options: 'i'
            }
        })
        if(!user) return res.status(404).json({ message: 'User not found' })
        return res.json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}