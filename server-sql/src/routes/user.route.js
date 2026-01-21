import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile", authenticate, getUserProfile);

export default router;
