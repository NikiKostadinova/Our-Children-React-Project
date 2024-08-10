import { errorHandler } from "../utils/error.js";
import Discussion from '../models/discussionModel.js'

export const add = async (req, res, next) => {   
    console.log(req.body)

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'All fields are required!'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g, '');
    const newDiscussion = new Discussion({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const savedDiscussion = await newDiscussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error) {
        next(error)
    }
};

export const getDiscussions = async (req, res, next) => {
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
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                    { category: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        };

        
        const [discussions, totalDiscussions] = await Promise.all([
            Discussion.find(query).sort({ updatedAt: sort }).skip(skip).limit(limit),
            Discussion.countDocuments(query)
        ]);
     
        const totalPages = Math.ceil(totalDiscussions / limit);

        res.status(200).json({
            discussions,
            totalDiscussions,
            totalPages,
            currentPage: page
        });

    } catch (error) {
        next(error);
    }
};


export const getUserDiscussions = async (req, res, next) => {
    console.log("Almost")

    try {
        const discussions = await Discussion.find({ userId: req.params.userId });
        res.status(200).json(discussions);

      } catch (error) {
        next(error);
      }
}

export const deleteDiscussion = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this discussion!'));
    }
    try {
        await Discussion.findByIdAndDelete(req.params.discussionId);
        res.status(200).json('The discussion has been deleted!');
    } catch (error) {
        next(error);
    }
}

export const editDiscussion = async (req, res, next) => {
  
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this discussion!'));
    }
    try {
        
        const editedDiscussion = await Discussion.findByIdAndUpdate(
            req.params.discussionId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image
                }
            }, { new: true })
        res.status(200).json(editedDiscussion)


    } catch (error) {
        next(error)
    }
}

export const getDiscussion = async (req, res, next) => {
    try {
        const discussion = await Discussion.findById(req.params.discussionId);
        if (!discussion) {
          return res.status(404).json({ message: 'Discussion not found' });
        }
        res.json(discussion);
      } catch (error) {
        next(error);
      }
}