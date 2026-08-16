import { Router } from "express";
import {
  createContactSubmission,
  listContactSubmissions,
  updateContactStatus,
} from "../controllers/contactController.js";
import { sanitizeBody, validateContactPayload } from "../middleware/validation.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

router.post("/", contactRateLimiter, sanitizeBody, validateContactPayload, createContactSubmission);

router.get("/", adminAuth, listContactSubmissions);
router.patch("/:id/status", adminAuth, sanitizeBody, updateContactStatus);

export default router;
