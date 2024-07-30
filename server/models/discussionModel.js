import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema({
    
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,           
            
        },
        category: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        likes: {
            type: Array,
            default: []
        },
        numberOfLikes: {
            type: Number,
            default: 0
        },
    }, {timestamps: true}
);

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;