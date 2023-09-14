import express from 'express';
import { registerUser, loginUser, autoLogin, getAllUsers } from '../controllers/User.js';
import validateToken from '../middlewares/verifyToken.js';

const router = express.Router();
router.get('/', validateToken, getAllUsers)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/auto-login', validateToken, autoLogin)
export default router;