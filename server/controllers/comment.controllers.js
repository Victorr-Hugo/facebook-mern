import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import User from '../models/User.js'
import Notifications from '../models/Notifications.js'
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
    folder: "odin_book/comments",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const createComment = async(req, res) => {
    try {
        const { post, id, body } = req.body
        const newComment = new Comment({ author:id, post, body })
        await Post.findByIdAndUpdate(
          post,
          {
            $push:{
              comments: newComment._id
            }
          }
        )
        await newComment.save()
        return res.status(200).json({ message: newComment })
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const likeComment = async(req, res) => {
  try {
      const { id, comment } = req.body
      const alreadyLiked = await Post.findOne(
          {
              likes:{
                $in: [ id ]
              }
            }
      )
      if(alreadyLiked) return res.status(500).json({ message: 'Post already liked' })
      
      const commentLiked = await Comment.findByIdAndUpdate(
          comment,
          {
              $push:{
                  likes: id
              }
          },
      )
      return res.status(200).json({ message: commentLiked })     
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}

export const removeComment = async (req, res) => {
  try {
      const { id } = req.params;
      const comment = await Comment.findByIdAndDelete(id);
  
      if (comment && comment.image.public_id) {
          await deleteImage(comment.image.public_id);
      }
  
      if (!comment) return res.status(404).json({ message: 'Comment not found' })   
      return res.status(200).json({ message: 'Comment Removed' })   
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};
