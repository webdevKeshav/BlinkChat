
import express from 'express'
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMssageAsSeen } from '../Controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.get("mark/:id", protectRoute, markMssageAsSeen);