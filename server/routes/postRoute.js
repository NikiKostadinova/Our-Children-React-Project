import express from 'express';
import {verifyUser} from '../utils/authUser.js';
import { add } from '../controllers/postCantroller.js';

const router = express.Router();

router.post('/add', verifyUser, add);


export default router;