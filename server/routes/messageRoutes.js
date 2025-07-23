
import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMssageAsSeen, sendMessage } from '../Controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.get("/mark/:id", protectRoute, markMssageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;