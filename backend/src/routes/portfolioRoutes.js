import { Router } from "express";
import {
  getCombinedPortfolio,
  getProfile,
  getProjects,
  getProjectBySlug,
  getDesigns,
  getCertifications,
  getExperience,
  getEducation,
  getSkills,
} from "../controllers/portfolioController.js";

const router = Router();

router.get("/portfolio", getCombinedPortfolio);
router.get("/profile", getProfile);
router.get("/projects", getProjects);
router.get("/projects/:slug", getProjectBySlug);
router.get("/designs", getDesigns);
router.get("/certifications", getCertifications);
router.get("/experience", getExperience);
router.get("/education", getEducation);
router.get("/skills", getSkills);

export default router;
