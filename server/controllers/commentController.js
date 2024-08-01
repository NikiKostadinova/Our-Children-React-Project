import Comment from "../models/commentModel.js";
import { errorHandler } from "../utils/error.js";


export const addComment = async (req, res, next) => {
   try {
    const { content, postId, discussionId, userId} = req.body;

    if(userId !== req.user.id){
        return next(errorHandler(403, 'Unathorized!'))
    }

    const newComment = new Comment({
        content,
        postId,
        discussionId,
        userId
    });

    await newComment.save();
    res.status(200).json(newComment);
   } catch (error) {
    next(error)
   } 
}

export const getComments = async (req, res, next) => {
    try {
        const { type, id } = req.params; 

        const filter = {};
        if (type === 'postId') {
            filter.postId = id;
        } else if (type === 'discussionId') {
            filter.discussionId = id;
        } else {
            return res.status(400).json({ error: "Invalid type. Use 'postId' or 'discussionId'" });
        }

        const comments = await Comment.find(filter).sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};


export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'The comment was not found!'));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);            
        }else{
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'The comment was not found!'));
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'You are not allowed to edit the comment!'));
        } 

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content
            }, {new: true}
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
   
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'The comment was not found!'));
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'You are not allowed to edit the comment!'));
        } 
        
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('The comment has been deleted!');
    } catch (error) {
        next(error)
    }
}