import Group from '../models/Group.js'
import User from '../models/User.js'
import Post from '../models/Post.js'
import fs from 'fs-extra'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY, 
  api_secret: API_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "odin_book/groups",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const getGroups = async(req, res) => {
    try {
        const groups = await Group.find({}).populate('users').populate('posts')
        return res.json(groups)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const getGroup = async(req, res) => {
    try {
        const { id } = req.params
        const group = await Group.findById(id).populate('users').populate('posts')
        return res.json(group)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}


export const createGroup = async(req, res) => {
    try {
        const { title, id } = req.body
        let image = null
        let banner = null
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        }
        if(req.files?.banner){
            const result = await uploadImage(req.files.banner.tempFilePath);
            await fs.remove(req.files.banner.tempFilePath);
            banner = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        }
        const newGroup = new Group({ title, image, banner })
        const user = await User.findByIdAndUpdate(
            id,
            {
                $push:{
                    groups: newGroup._id
                }
            }
        )
        await newGroup.save()
        await Group.findByIdAndUpdate(
            newGroup._id,
            {
                $push:{
                    users:id
                }
            }
        )
        return res.status(200).json({ message: user, newGroup })        
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const joinGroup = async(req, res) => {
    try {
        const { groupId, userId } = req.body
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $push:{
                    groups: groupId
                }
            }
        )
        const group = await Group.findByIdAndUpdate(
            groupId,
            {
                $push:{
                    users: userId
                }
            }
        )
        return res.status(200).json({ message: user, group })        
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const removeGroup = async(req, res) => {
    try {
        const{ id } = req.params
        const group = await Group.findByIdAndDelete(id)
        return res.status(200).json({ message: group })        
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const createPost = async(req, res) =>{
    try {
        const { author, body, fromgroup } = req.body
        let image = null
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        }
        const newPost = new Post({ author, body, fromgroup, image })
        await newPost.save()
        const updatedGroup = await Group.findByIdAndUpdate(
            fromgroup,
            {
                $push:{
                    posts:newPost._id
                }
            }
        )
        return res.status(200).json({ message: newPost, updatedGroup })        
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const searchGroup = async(req, res) => {
    try {
        const { description } = req.body
        const group = await Group.find({
            title: {
                $regex: description, $options: 'i'
            }
        })
        if(!group) return res.status(404).json({ message: 'Group not found' })
        return res.json(group)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}