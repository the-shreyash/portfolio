import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Design from "../models/Design.js";
import Experience from "../models/Experience.js";
import Certification from "../models/Certification.js";
import Education from "../models/Education.js";
import Skill from "../models/Skill.js";
import ContactSubmission from "../models/ContactSubmission.js";

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_TOKEN || "portfolio-jwt-fallback-secret-key";

// POST /api/admin/login
export async function loginAdmin(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    // Check against AdminUser collection first
    const user = await AdminUser.findOne({
      $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }],
    });

    let isValid = false;
    let userId = null;
    let userRole = "admin";
    let userDisplay = username;

    if (user) {
      isValid = await user.comparePassword(password);
      if (isValid) {
        userId = user._id;
        userRole = user.role;
        userDisplay = user.username;
        user.lastLogin = new Date();
        await user.save();
      }
    } else {
      // Fallback check against ADMIN_PASSWORD or ADMIN_TOKEN in env for initial bootstrap
      const envPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN;
      if (envPassword && (password === envPassword || username === envPassword)) {
        isValid = true;
        userId = "env-admin";
        userRole = "superadmin";
      }
    }

    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: userId, username: userDisplay, role: userRole },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { id: userId, username: userDisplay, role: userRole },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/admin/me
export async function getAdminMe(req, res) {
  res.json({
    success: true,
    user: req.user,
  });
}

// GET /api/admin/stats
export async function getAdminStats(req, res, next) {
  try {
    const [
      totalProjects,
      totalDesigns,
      totalCertificates,
      totalExperiences,
      totalSubmissions,
      newSubmissions,
    ] = await Promise.all([
      Project.countDocuments(),
      Design.countDocuments(),
      Certification.countDocuments(),
      Experience.countDocuments(),
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ status: "new" }),
    ]);

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalDesigns,
        totalCertificates,
        totalExperiences,
        totalSubmissions,
        newSubmissions,
      },
    });
  } catch (err) {
    next(err);
  }
}

// --- PROFILE CRUD ---
export async function getAdminProfile(req, res, next) {
  try {
    let profile = await Profile.findOne().sort({ updatedAt: -1 });
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json({ success: true, profile });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminProfile(req, res, next) {
  try {
    let profile = await Profile.findOne().sort({ updatedAt: -1 });
    if (profile) {
      Object.assign(profile, req.body);
      await profile.save();
    } else {
      profile = await Profile.create(req.body);
    }
    res.json({ success: true, profile });
  } catch (err) {
    next(err);
  }
}

// --- PROJECTS CRUD ---
export async function listAdminProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    next(err);
  }
}

export async function createAdminProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    res.json({ success: true, project });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    res.json({ success: true, message: "Project deleted." });
  } catch (err) {
    next(err);
  }
}

// --- DESIGNS CRUD ---
export async function listAdminDesigns(req, res, next) {
  try {
    const designs = await Design.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, designs });
  } catch (err) {
    next(err);
  }
}

export async function createAdminDesign(req, res, next) {
  try {
    const design = await Design.create(req.body);
    res.status(201).json({ success: true, design });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminDesign(req, res, next) {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!design) return res.status(404).json({ success: false, message: "Design not found." });
    res.json({ success: true, design });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminDesign(req, res, next) {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ success: false, message: "Design not found." });
    res.json({ success: true, message: "Design deleted." });
  } catch (err) {
    next(err);
  }
}

// --- EXPERIENCE CRUD ---
export async function listAdminExperience(req, res, next) {
  try {
    const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, experience });
  } catch (err) {
    next(err);
  }
}

export async function createAdminExperience(req, res, next) {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, experience });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminExperience(req, res, next) {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ success: false, message: "Experience not found." });
    res.json({ success: true, experience });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminExperience(req, res, next) {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ success: false, message: "Experience not found." });
    res.json({ success: true, message: "Experience deleted." });
  } catch (err) {
    next(err);
  }
}

// --- CERTIFICATIONS CRUD ---
export async function listAdminCertifications(req, res, next) {
  try {
    const certifications = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, certifications });
  } catch (err) {
    next(err);
  }
}

export async function createAdminCertification(req, res, next) {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, certification });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminCertification(req, res, next) {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certification) return res.status(404).json({ success: false, message: "Certification not found." });
    res.json({ success: true, certification });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminCertification(req, res, next) {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ success: false, message: "Certification not found." });
    res.json({ success: true, message: "Certification deleted." });
  } catch (err) {
    next(err);
  }
}

// --- EDUCATION CRUD ---
export async function listAdminEducation(req, res, next) {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, education });
  } catch (err) {
    next(err);
  }
}

export async function createAdminEducation(req, res, next) {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, education });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminEducation(req, res, next) {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ success: false, message: "Education not found." });
    res.json({ success: true, education });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminEducation(req, res, next) {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ success: false, message: "Education not found." });
    res.json({ success: true, message: "Education deleted." });
  } catch (err) {
    next(err);
  }
}

// --- SKILLS CRUD ---
export async function listAdminSkills(req, res, next) {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json({ success: true, skills });
  } catch (err) {
    next(err);
  }
}

export async function createAdminSkill(req, res, next) {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, skill });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found." });
    res.json({ success: true, skill });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found." });
    res.json({ success: true, message: "Skill deleted." });
  } catch (err) {
    next(err);
  }
}

// --- CONTACT SUBMISSIONS ---
export async function listAdminContacts(req, res, next) {
  try {
    const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminContactStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }
    const contact = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: "Submission not found." });
    res.json({ success: true, contact });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminContact(req, res, next) {
  try {
    const contact = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Submission not found." });
    res.json({ success: true, message: "Submission deleted." });
  } catch (err) {
    next(err);
  }
}
