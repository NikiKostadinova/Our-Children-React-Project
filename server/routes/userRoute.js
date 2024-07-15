import express from 'express';
import { editUser, test } from '../controllers/userController.js';
import { verifyUser } from '../utils/authUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/edit/:userId', verifyUser, editUser);


export default router;