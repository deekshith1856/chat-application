import express from 'express'
import validateToken from '../middlewares/verifyToken.js';
import { allMessages, sendMessage } from '../controllers/Message.js';

const router = express.Router();
router.get('/:chatId', validateToken, allMessages);
router.post('/', validateToken, sendMessage);

export default router;