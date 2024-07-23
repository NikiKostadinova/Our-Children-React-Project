import Comment from "../models/commentModel.js";
import { errorHandler } from "../utils/error.js";


export const addComment = async (req, res, next) => {
   try {
    const { content, postId, userId} = req.body;

    if(userId !== req.user.id){
        return next(errorHandler(403, 'Unathorized!'))
    }

    const newComment = new Comment({
        content,
        postId,
        userId
    });

    await newComment.save();
    res.status(200).json(newComment);
   } catch (error) {
    next(error)
   } 
}