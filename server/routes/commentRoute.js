import express from 'express';
import { addComment, getComments, likeComment } from '../controllers/commentController.js';
import {verifyUser} from '../utils/authUser.js';


const router = express.Router();

router.post('/add', verifyUser, addComment);
router.get('/getComments/:postId', getComments);
router.put('/likeComment/:commentId', verifyUser, likeComment);

export default router;