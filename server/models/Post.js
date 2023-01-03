import mongoose from "mongoose";
import User from './User.js'

const postSchema = new mongoose.Schema(
    {
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        body: {
            type: String,
            required: true,
        },
        image :{
            public_id: String,
            url: String,
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }],
        comments:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        },
        {
            timestamps: true,
        }],
        shared:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }],
        fromgroup:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Groups',
        },
        frompage:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pages',
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Posts', postSchema)