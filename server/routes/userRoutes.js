
import express from "express";
import { checkAuth, login, signup, updateProfile } from "../Controllers/userController.js";
import { protectRoute } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update-profile", protectRoute, updateProfile);
userRouter.post("/check", protectRoute, checkAuth);

export default userRouter;