import express from 'express';
import {verifyUser} from '../utils/authUser.js';
import { add, deleteDiscussion, editDiscussion, getDiscussion } from '../controllers/discussionController.js';

const router = express.Router();

router.post('/add', verifyUser, add);
router.get('/getdiscussions', getDiscussion);
router.delete('/deletediscussion/:discussionId/:userId', verifyUser, deleteDiscussion);
router.put('/editdiscussion/:discussionId/:userId', verifyUser, editDiscussion);


export default router;