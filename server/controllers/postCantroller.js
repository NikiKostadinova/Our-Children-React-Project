import { errorHandler } from "../utils/error.js";
import Post from '../models/postModel.js'

export const add = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to add a post!'));
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'All fields are required!'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g, '');
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error)
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 9;
        const sort = req.query.order === 'asc' ? 1 : -1;
        const skip = (page - 1) * limit;     
        

        const query = {
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } }
                ],
            }),
        };

        const [posts, totalPosts] = await Promise.all([
            Post.find(query).sort({ updatedAt: sort }).skip(skip).limit(limit),
            Post.countDocuments(query)
        ]);       

        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            posts,
            totalPosts,
            totalPages,
            currentPage: page
        });

    } catch (error) {
        next(error);
    }
};


export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post!'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted!');
    } catch (error) {
        next(error);
    }
}

export const editPost = async (req, res, next) => {
  
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this post'));
    }
    try {
        
        const editedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image
                }
            }, { new: true })
        res.status(200).json(editedPost)


    } catch (error) {
        next(error)
    }
}

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
      } catch (error) {
        next(error);
      }
}