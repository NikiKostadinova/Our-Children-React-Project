import express from 'express';
import {verifyUser} from '../utils/authUser.js';
import { add, getPosts } from '../controllers/postCantroller.js';

const router = express.Router();

router.post('/add', verifyUser, add);
router.get('/getposts', getPosts)


export default router;