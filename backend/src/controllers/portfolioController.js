import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Design from "../models/Design.js";
import Experience from "../models/Experience.js";
import Certification from "../models/Certification.js";
import Education from "../models/Education.js";
import Skill from "../models/Skill.js";

// GET /api/portfolio - Combined portfolio content
export async function getCombinedPortfolio(req, res, next) {
  try {
    const [
      profileDoc,
      projects,
      designs,
      experience,
      certifications,
      education,
      skills,
    ] = await Promise.all([
      Profile.findOne().sort({ updatedAt: -1 }).lean(),
      Project.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Design.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Experience.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Certification.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Education.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Skill.find({ published: true }).sort({ order: 1, name: 1 }).lean(),
    ]);

    const featuredProjects = projects.filter((p) => p.featured);
    const otherProjects = projects.filter((p) => !p.featured);

    res.json({
      success: true,
      data: {
        profile: profileDoc || {
          name: "Shreyash Yadav",
          role: "AI Product Builder & Full-Stack Engineer",
          headline: "I BUILD INTELLIGENT DIGITAL PRODUCTS.",
          bio: "I'm a computer science student and builder focused on AI, full-stack engineering and products that solve real problems.",
          location: "India",
          email: "shs140326@gmail.com",
          photoUrl: "/profile/shreyash-photo.png",
          availability: true,
          availabilityText: "Available for select projects",
          githubUrl: "https://github.com/the-shreyash",
          linkedinUrl: "https://www.linkedin.com/in/shreyash-yadav-b15024296/",
          domains: ["AI", "Full-Stack", "Product", "Systems"],
        },
        projects,
        featuredProjects,
        otherProjects,
        designs,
        experience,
        certifications,
        education,
        skills,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/profile
export async function getProfile(req, res, next) {
  try {
    const profile = await Profile.findOne().sort({ updatedAt: -1 });
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
}

// GET /api/projects
export async function getProjects(req, res, next) {
  try {
    const query = { published: true };
    if (req.query.featured !== undefined) {
      query.featured = req.query.featured === "true";
    }
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:slug
export async function getProjectBySlug(req, res, next) {
  try {
    const project = await Project.findOne({ slug: req.params.slug, published: true });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

// GET /api/designs
export async function getDesigns(req, res, next) {
  try {
    const designs = await Design.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: designs });
  } catch (err) {
    next(err);
  }
}

// GET /api/certifications
export async function getCertifications(req, res, next) {
  try {
    const certifications = await Certification.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: certifications });
  } catch (err) {
    next(err);
  }
}

// GET /api/experience
export async function getExperience(req, res, next) {
  try {
    const experience = await Experience.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: experience });
  } catch (err) {
    next(err);
  }
}

// GET /api/education
export async function getEducation(req, res, next) {
  try {
    const education = await Education.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: education });
  } catch (err) {
    next(err);
  }
}

// GET /api/skills
export async function getSkills(req, res, next) {
  try {
    const skills = await Skill.find({ published: true }).sort({ order: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (err) {
    next(err);
  }
}
