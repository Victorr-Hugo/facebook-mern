import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
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
        url:String,
        body: String,
        type: String,
    },{timestamps: true}
)

notificationSchema.pre('save', function () {
    if(this.isNew){
        const from_name = this.from.username

        switch(this.type){
            case 'like_post':
                this.message = `${from_name} liked your post`
                break;
            case 'like_comment':
                this.message = `${from_name} liked your comment`
                break;
            case 'friend_request':
                this.message = `${from_name} sent you a friend request`
                break;
        }
    }
})

export default mongoose.model('Notifications', notificationSchema)