import validator from "validator";

const PROJECT_TYPES = [
  "AI Product",
  "Web Application",
  "SaaS",
  "Portfolio",
  "E-commerce",
  "Automation",
  "Other",
];

function stripKey(value) {
  if (Array.isArray(value)) return value.map(stripKey);
  if (value && typeof value === "object") {
    const clean = {};
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith("$") || key.includes(".")) continue;
      clean[key] = stripKey(val);
    }
    return clean;
  }
  return value;
}

export function sanitizeBody(req, _res, next) {
  if (req.body && typeof req.body === "object") {
    req.body = stripKey(req.body);
  }
  next();
}

export function validateContactPayload(req, res, next) {
  const errors = {};
  const body = req.body || {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";

  if (!name) errors.name = "Name is required.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!validator.isEmail(email)) errors.email = "Enter a valid email address.";

  if (!message) errors.message = "Message is required.";
  else if (message.length > 4000) errors.message = "Message is too long.";

  if (projectType && !PROJECT_TYPES.includes(projectType)) {
    errors.projectType = "Invalid project type.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  req.body = {
    name: validator.escape(name),
    email,
    company: validator.escape(company).slice(0, 160),
    projectType,
    budget: validator.escape(budget).slice(0, 80),
    message: validator.escape(message),
  };

  next();
}
