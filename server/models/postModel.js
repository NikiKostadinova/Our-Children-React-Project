import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
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
            default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fpost_326020&psig=AOvVaw37CUPl4LYrIq2CZb4yF2W5&ust=1721375286019000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJin8PGMsIcDFQAAAAAdAAAAABAR',
            required: true
        },
        category: {
            type: String,
            default: 'uncategorized'
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
    }, {timestamps: true}
);

    const Post = mongoose.model('Post', postSchema);

    export default Post;
