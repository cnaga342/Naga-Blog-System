import {Schema, model} from 'mongoose';


const postSchema = new Schema({
    userId: {
        type: String,
        required : true,
    },
    content: {
        type : String,
        required: true,
    },
    title: {
        type : String,
        required: true,
        unique: true,
    },
    image : {
        type: String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTije9AAm6YQiEKbCnT7XO1X-0X3r7LCAdCBw&s',
    },
    category :{
        type : String,
        default : 'uncategorized',
    },
    slug : {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

const Post = model('post', postSchema);

export default Post;