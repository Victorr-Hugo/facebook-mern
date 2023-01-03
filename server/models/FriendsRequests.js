import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
    {
        to: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users'
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        clicked: {
            type: Boolean,
            default: false
        },
        status:Number,
    },{timestamps: true}
)

export default mongoose.model('FriendsRequests', friendRequestSchema)