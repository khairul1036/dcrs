import express from "express";
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} from "../controllers/role.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { hasPermission } from "../middlewares/permission.middleware.js";

const router = express.Router();

// CREATE ROLE
router.post("/", authenticate, hasPermission("Roles"), createRole);

// GET ALL ROLES
router.get("/", authenticate, hasPermission("Roles"), getAllRoles);

// GET SINGLE ROLE
router.get("/:id", authenticate, hasPermission("Roles"), getRoleById);

// UPDATE ROLE
router.put("/:id", authenticate, hasPermission("Roles"), updateRole);

// DELETE ROLE
router.delete("/:id", authenticate, hasPermission("Roles"), deleteRole);

export default router;
