import Post from '../models/Post.js'
import fs from 'fs-extra'
import User from '../models/User.js'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY, 
  api_secret: API_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "odin_book/posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const getPosts = async(req, res) =>{
    try {
        const posts = await Post.find({}).sort({_id: -1}).populate('author').populate({
          path: 'comments',
          populate: {
            path : 'author'
          }
        }).populate('fromgroup').populate('frompage')
        return res.json(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const createPost = async(req, res) => {
    try {
        const { author, body } = req.body
        console.log(author, body)
        let image = null
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        }
        if(!req.files && !body){
          return res.status(500).json({ message: error.message })
        }else{
          const newPost = new Post({ author, body, image })
          await newPost.save()
          console.log(newPost)
          const user = await User.findByIdAndUpdate(
              author,   
              {
                  $push:{
                      posts: newPost._id
                  }
              }
          )
          return res.status(200).json({ message: user, newPost })
        }        
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const getPost = async(req, res) => {
    try {
        const { id }  = req.params
        const post = await Post.findById(id).populate('fromgroup').populate('frompage').populate('comments').populate('author')
        if(!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const updatePost = async (req, res) => {
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
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
            }
        );
        return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    
    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }
      
    if (!post) return res.sendStatus(404);
      res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sharePost = async(req, res) => {
  try {
    const { sharedPost, shareUser } = req.body
    const post = await Post.findByIdAndUpdate(
      sharedPost,
        {
          $push:{
            shared: shareUser
          }
        }
    )
    const user = await User.findByIdAndUpdate(
      shareUser,
      {
        $push:{
          sharedPosts: sharedPost
        }
      }
    )
    return res.json(user, post)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const likePost = async(req, res) => {
  try {
      const { post, user } = req.body
      await Post.findByIdAndUpdate(
        post,
        {
          $push:{
            likes: user
          }
        }
      )
      await User.findByIdAndUpdate(
        user,
        {
          $push:{
            likes: post
          }
        }
      )
      return res.sendStatus(200)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}