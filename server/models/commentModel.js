import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: false
    },
    discussionId: {
        type: String,
        required: false 
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    numberOfLikes: {
        type: Number,
        default: 0
    },
    
},{ timestamps: true})

commentSchema.pre('save', function(next) {
    if (!this.postId && !this.discussionId) {
        return next(new Error('Either postId or discussionId must be provided'));
    }
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;