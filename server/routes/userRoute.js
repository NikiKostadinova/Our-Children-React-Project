import express from 'express';
import { deleteUser, editUser, signOut, test } from '../controllers/userController.js';
import { verifyUser } from '../utils/authUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/edit/:userId', verifyUser, editUser);
router.delete('/delete/:userId', verifyUser, deleteUser);
router.post('/signout', signOut);


export default router;