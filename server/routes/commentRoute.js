import express from 'express';
import { addComment, deleteComment, getComments, getUserComments, likeComment, updateComment } from '../controllers/commentController.js';
import {verifyUser} from '../utils/authUser.js';


const router = express.Router();

router.post('/add', verifyUser, addComment);
router.get('/getComments/:type/:id', getComments);
router.put('/likeComment/:commentId', verifyUser, likeComment);
router.put('/updateComment/:commentId', verifyUser, updateComment);
router.delete('/deleteComment/:commentId', verifyUser, deleteComment);
router.get('/getUserComments/:userId', verifyUser, getUserComments);





export default router;