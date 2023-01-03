import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        title: String,
        description: {
            type: String,
            required: true,
        },
        image1 :{
            public_id: String,
            url: String,
        },
        image2 :{
            public_id: String,
            url: String,
        },
        comments:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        },
        {
            timestamps: true,
        }],
        price: {
            type: String,
            required: true,
        },
        buyed: {
            type: Boolean,
            default: false,
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }],
    },{timestamps: true}
)

export default mongoose.model('Products', productSchema)