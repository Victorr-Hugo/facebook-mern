import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        from:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users',
        },
        body: {
            type: String,
            required: true,
        },
        image :{
            public_id: String,
            url: String,
        },
        chatId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },    
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Messages', messageSchema)