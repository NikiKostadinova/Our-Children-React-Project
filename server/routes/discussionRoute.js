import express from 'express';
import {verifyUser} from '../utils/authUser.js';
import { add, deleteDiscussion, editDiscussion, getDiscussion, getDiscussions, getUserDiscussions } from '../controllers/discussionController.js';

const router = express.Router();

router.post('/add', verifyUser, add);
router.get('/getdiscussions', getDiscussions);
router.delete('/deletediscussion/:discussionId/:userId', verifyUser, deleteDiscussion);
router.put('/editdiscussion/:discussionId/:userId', verifyUser, editDiscussion);
router.get('/getUserDiscussions/:userId', verifyUser, getUserDiscussions);
router.get('/getdiscussion/:discussionId', verifyUser, getDiscussion);




export default router;