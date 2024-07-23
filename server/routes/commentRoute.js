import express from 'express';
import { addComment } from '../controllers/commentController.js';
import {verifyUser} from '../utils/authUser.js';


const router = express.Router();

router.post('/add', verifyUser, addComment);

export default router;