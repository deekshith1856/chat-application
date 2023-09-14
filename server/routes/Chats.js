import express from 'express';
import validateToken from '../middlewares/verifyToken.js';
import { fetchChats, accessChat, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../controllers/Chats.js'
const router = express.Router();

router.get("/", validateToken, fetchChats);
router.post('/', validateToken, accessChat);
router.post('/group', validateToken, createGroupChat)
router.put("/rename", validateToken, renameGroup);
router.put('/groupRemove', validateToken, removeFromGroup);
router.put('/groupAdd', validateToken, addToGroup);

export default router;