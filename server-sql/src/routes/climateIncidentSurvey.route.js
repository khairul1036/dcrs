import express from "express";
import { createClimateIncidentSurvey, deleteSurvey, getAllSurveys, getDistrictSummary, getHazardAnalyticsByDistrict, getSurveyById, getSurveyStatistics, updateSurvey } from "../controllers/climateIncidentSurvey.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Insert full survey JSON
router.get("/district-summary", getDistrictSummary);
router.get("/statistics", getSurveyStatistics);
router.get("/hazard-analytics", getHazardAnalyticsByDistrict);

router.post("/", authenticate, createClimateIncidentSurvey);
router.get("/", authenticate, getAllSurveys);
router.get("/:id", authenticate, getSurveyById);
router.put("/:id", authenticate, updateSurvey);
router.delete("/:id", authenticate, deleteSurvey);

export default router;
