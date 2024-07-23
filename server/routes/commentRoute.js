import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import {verifyUser} from '../utils/authUser.js';


const router = express.Router();

router.post('/add', verifyUser, addComment);
router.get('/getComments/:postId', getComments)

export default router;