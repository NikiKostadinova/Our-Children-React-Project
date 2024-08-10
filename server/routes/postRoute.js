import express from 'express';
import {verifyUser} from '../utils/authUser.js';
import { add, deletePost, editPost, getPost, getPosts } from '../controllers/postCantroller.js';

const router = express.Router();

router.post('/add', verifyUser, add);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyUser, deletePost);
router.put('/editpost/:postId/:userId', verifyUser, editPost);
router.get('/getpost/:postId', verifyUser, getPost);



export default router;