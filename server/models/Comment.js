import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users',
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Posts',
        },
        body:{
            type:String,
            required:true,
        },
        image :{
            public_id: String,
            url: String,
        },
        likes:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },    
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Comments', commentSchema)