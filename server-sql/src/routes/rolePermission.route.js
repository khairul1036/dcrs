import express from "express";
import { getAllPermissions, getRolePermissions, updateRolePermissions } from "../controllers/rolePermission.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { hasPermission } from "../middlewares/permission.middleware.js";

const router = express.Router();

// get all permisisons
router.get("/", authenticate, hasPermission("Permissions"), getAllPermissions);

// GET role with permissions
router.get("/:id/permissions", authenticate, hasPermission("Permissions"), getRolePermissions);

// PUT update role permissions
router.put("/:id/permissions", authenticate, hasPermission("Permissions"), updateRolePermissions);

export default router;
