import express from "express";
const router = express.Router();

import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import roleRoutes from "./role.route.js";
import rolePermissionRoutes from "./rolePermission.route.js";
import climateIncidentSurveyRoutes from "./climateIncidentSurvey.route.js";


router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/role-permissions", rolePermissionRoutes);
router.use("/climate-incident-surveys", climateIncidentSurveyRoutes);


export default router;
