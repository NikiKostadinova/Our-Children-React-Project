import express from 'express';
import { googleAuth,  login,  register,} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/signin', login);
router.post('/google', googleAuth);


export default router;