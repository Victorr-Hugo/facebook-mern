import mongoose from "mongoose";

const gruopShcema = new mongoose.Schema(
    {
        title:String,
        image: {
            public_id:String,
            url: String,
        },
        banner:{
            public_id:String,
            url: String,
        },
        users:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Users'
            }
        ],
        posts:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Posts'
            }  
        ],
        about: String,
    }
)

export default mongoose.model('Groups', gruopShcema)