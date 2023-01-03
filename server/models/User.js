import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname:String,
        lastname:String,
        username: String,
        email: String,
        password: String,
        image: {
            public_id:String,
            url: String,
        },
        banner: {
            public_id:String,
            url: String,
        },
        friends:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Users'
            }
        ],
        friendsRequests:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'FriendsRequests',
            }
        ],
        posts:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Posts'
            }  
        ],
        products:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Products'
            }  
        ],
        chats:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Chats' 
            }
        ],
        groups:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Groups' 
            }
        ],
        markedposts:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Posts'
            }
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Posts'
            }   
        ],
        likedProducts: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Products'
            }
        ],
        pages:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Pages'
            }
        ],
        pagesliked:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Pages'
            }
        ]
    },{timestamps: true}
)

export default mongoose.model('Users', userSchema)