import express from "express";
const router = express.Router();

import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import roleRoutes from "./role.route.js";


router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/role", roleRoutes);


export default router;
