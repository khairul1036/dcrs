import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getUserProfile, updateUserProfile, getAllUsers, updateUserApprovalStatus, updateUserDetails, deleteUser } from "../controllers/user.controller.js";
import { hasPermission } from "../middlewares/permission.middleware.js";


const router = express.Router();

// User profile
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, hasPermission("Profile"), updateUserProfile);

// get all users for approval and rejection
router.get("/", authenticate, hasPermission("User List"), getAllUsers);

// User approval and rejection
router.patch("/approval/:id", authenticate, hasPermission("User Approval"), updateUserApprovalStatus);

// Update user details 
router.patch("/:id", authenticate, hasPermission("User Edit"), updateUserDetails);

// Delete user
router.delete("/:id", authenticate, hasPermission("User Delete"), deleteUser);


export default router;
