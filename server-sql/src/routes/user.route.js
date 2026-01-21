import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);

export default router;
