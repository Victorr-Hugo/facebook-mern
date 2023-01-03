import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users',
        }],
        messages:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Messages',
            },
        ],
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Messages',
        }

    },{timestamps: true}
)

export default mongoose.model('Chats', chatSchema)