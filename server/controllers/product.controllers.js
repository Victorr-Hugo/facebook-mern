import Product from '../models/Product.js'
import fs from 'fs-extra'
import User from '../models/User.js'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "odin_book/marketplace",
  });
};

const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const getProducts = async(req, res) =>{
    try {
        const products = await Product.find({}).sort({_id: -1}).populate('author').populate({
          path: 'comments',
          populate: {
            path : 'author'
          }
        })
        return res.json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const createProduct = async(req, res) => {
    try {
        const { author, description, price, title } = req.body
        let image1 = null
        let image2 = null

        if (req.files?.image1) {
            const result = await uploadImage(req.files.image1.tempFilePath);
            await fs.remove(req.files.image1.tempFilePath);
            image1 = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        }  
        if (req.files?.image2) {
            const result = await uploadImage(req.files.image2.tempFilePath);
            await fs.remove(req.files.image2.tempFilePath);
            image2 = {
              url: result.secure_url,
              public_id: result.public_id,
            };
        } 
          
        const newPost = new Product({ author, description, price, title, image1, image2 })
        console.log(newPost)

        const user = await User.findByIdAndUpdate(
            author,   
            {
                $push:{
                    products: newPost._id
                }
            }
        )
        await newPost.save()
        return res.status(200).json({ message: user, newPost })        
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const getPost = async(req, res) => {
    try {
        const { id }  = req.params
        const post = await Product.findById(id)
        if(!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })        
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        if (req.files?.image1) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        req.body.image1 = {
            url: result.secure_url,
            public_id: result.public_id,
        };
        }
        if (req.files?.image2) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            req.body.image2 = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }
            
        const updatedPost = await Product.findByIdAndUpdate(
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
      const post = await Product.findByIdAndDelete(id);
      
      if (post && post.image1.public_id && post.image2.public_id) {
        await deleteImage(post.image1.public_id);
        await deleteImage(post.image2.public_id);
      }
        
      if (!post) return res.sendStatus(404);
        res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

export const createComment = async(req, res) => {
    try {
        const { product, id, body } = req.body

        const newComment = new Comment({ author:id, post, body, image })
        await Product.findByIdAndUpdate(
          product,
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


export const likeProduct = async(req, res) => {
    try {
      const { product, id } = req.body
      const post = await Product.findByIdAndUpdate(
        product,
          {
            $push:{
              likes: id
            }
          }
      )
      const user = await User.findByIdAndUpdate(
        id,
        {
          $push:{
            likedProducts: product
          }
        }
      )
      return res.json(user, post)
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }