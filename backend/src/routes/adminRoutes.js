import { Router } from "express";
import { authenticateToken } from "../middleware/jwtAuth.js";
import {
  loginAdmin,
  getAdminMe,
  getAdminStats,
  getAdminProfile,
  updateAdminProfile,
  listAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  listAdminDesigns,
  createAdminDesign,
  updateAdminDesign,
  deleteAdminDesign,
  listAdminExperience,
  createAdminExperience,
  updateAdminExperience,
  deleteAdminExperience,
  listAdminCertifications,
  createAdminCertification,
  updateAdminCertification,
  deleteAdminCertification,
  listAdminEducation,
  createAdminEducation,
  updateAdminEducation,
  deleteAdminEducation,
  listAdminSkills,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
  listAdminContacts,
  updateAdminContactStatus,
  deleteAdminContact,
} from "../controllers/adminController.js";

const router = Router();

// Public auth endpoint
router.post("/login", loginAdmin);

// Protected admin endpoints
router.use(authenticateToken);

router.get("/me", getAdminMe);
router.get("/stats", getAdminStats);

// Profile
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);

// Projects
router.get("/projects", listAdminProjects);
router.post("/projects", createAdminProject);
router.put("/projects/:id", updateAdminProject);
router.delete("/projects/:id", deleteAdminProject);

// Designs
router.get("/designs", listAdminDesigns);
router.post("/designs", createAdminDesign);
router.put("/designs/:id", updateAdminDesign);
router.delete("/designs/:id", deleteAdminDesign);

// Experience
router.get("/experience", listAdminExperience);
router.post("/experience", createAdminExperience);
router.put("/experience/:id", updateAdminExperience);
router.delete("/experience/:id", deleteAdminExperience);

// Certifications
router.get("/certifications", listAdminCertifications);
router.post("/certifications", createAdminCertification);
router.put("/certifications/:id", updateAdminCertification);
router.delete("/certifications/:id", deleteAdminCertification);

// Education
router.get("/education", listAdminEducation);
router.post("/education", createAdminEducation);
router.put("/education/:id", updateAdminEducation);
router.delete("/education/:id", deleteAdminEducation);

// Skills
router.get("/skills", listAdminSkills);
router.post("/skills", createAdminSkill);
router.put("/skills/:id", updateAdminSkill);
router.delete("/skills/:id", deleteAdminSkill);

// Contacts
router.get("/contacts", listAdminContacts);
router.patch("/contacts/:id/status", updateAdminContactStatus);
router.delete("/contacts/:id", deleteAdminContact);

export default router;
