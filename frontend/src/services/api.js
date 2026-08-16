import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Helper to attach authorization header
const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ── Public APIs ─────────────────────────────────────────────────────────────

export async function getPortfolio() {
  const { data } = await client.get("/api/portfolio");
  return data.data;
}

export async function getProfile() {
  const { data } = await client.get("/api/profile");
  return data.data;
}

export async function getProjects(params) {
  const { data } = await client.get("/api/projects", { params });
  return data.data;
}

export async function getProjectBySlug(slug) {
  const { data } = await client.get(`/api/projects/${slug}`);
  return data.data;
}

export async function getDesigns() {
  const { data } = await client.get("/api/designs");
  return data.data;
}

export async function getCertifications() {
  const { data } = await client.get("/api/certifications");
  return data.data;
}

export async function getExperience() {
  const { data } = await client.get("/api/experience");
  return data.data;
}

export async function getEducation() {
  const { data } = await client.get("/api/education");
  return data.data;
}

export async function getSkills() {
  const { data } = await client.get("/api/skills");
  return data.data;
}

export async function submitContactForm(payload) {
  const { data } = await client.post("/api/contact", payload);
  return data;
}

// ── Admin APIs ──────────────────────────────────────────────────────────────

export async function adminLogin(username, password) {
  const { data } = await client.post("/api/admin/login", { username, password });
  return data;
}

export async function getAdminMe(token) {
  const { data } = await client.get("/api/admin/me", authConfig(token));
  return data;
}

export async function getAdminStats(token) {
  const { data } = await client.get("/api/admin/stats", authConfig(token));
  return data.stats;
}

export async function getAdminProfile(token) {
  const { data } = await client.get("/api/admin/profile", authConfig(token));
  return data.profile;
}

export async function updateAdminProfile(payload, token) {
  const { data } = await client.put("/api/admin/profile", payload, authConfig(token));
  return data.profile;
}

// Projects
export async function getAdminProjects(token) {
  const { data } = await client.get("/api/admin/projects", authConfig(token));
  return data.projects;
}

export async function createAdminProject(payload, token) {
  const { data } = await client.post("/api/admin/projects", payload, authConfig(token));
  return data.project;
}

export async function updateAdminProject(id, payload, token) {
  const { data } = await client.put(`/api/admin/projects/${id}`, payload, authConfig(token));
  return data.project;
}

export async function deleteAdminProject(id, token) {
  const { data } = await client.delete(`/api/admin/projects/${id}`, authConfig(token));
  return data;
}

// Designs
export async function getAdminDesigns(token) {
  const { data } = await client.get("/api/admin/designs", authConfig(token));
  return data.designs;
}

export async function createAdminDesign(payload, token) {
  const { data } = await client.post("/api/admin/designs", payload, authConfig(token));
  return data.design;
}

export async function updateAdminDesign(id, payload, token) {
  const { data } = await client.put(`/api/admin/designs/${id}`, payload, authConfig(token));
  return data.design;
}

export async function deleteAdminDesign(id, token) {
  const { data } = await client.delete(`/api/admin/designs/${id}`, authConfig(token));
  return data;
}

// Certifications
export async function getAdminCertifications(token) {
  const { data } = await client.get("/api/admin/certifications", authConfig(token));
  return data.certifications;
}

export async function createAdminCertification(payload, token) {
  const { data } = await client.post("/api/admin/certifications", payload, authConfig(token));
  return data.certification;
}

export async function updateAdminCertification(id, payload, token) {
  const { data } = await client.put(`/api/admin/certifications/${id}`, payload, authConfig(token));
  return data.certification;
}

export async function deleteAdminCertification(id, token) {
  const { data } = await client.delete(`/api/admin/certifications/${id}`, authConfig(token));
  return data;
}

// Experience
export async function getAdminExperience(token) {
  const { data } = await client.get("/api/admin/experience", authConfig(token));
  return data.experience;
}

export async function createAdminExperience(payload, token) {
  const { data } = await client.post("/api/admin/experience", payload, authConfig(token));
  return data.experience;
}

export async function updateAdminExperience(id, payload, token) {
  const { data } = await client.put(`/api/admin/experience/${id}`, payload, authConfig(token));
  return data.experience;
}

export async function deleteAdminExperience(id, token) {
  const { data } = await client.delete(`/api/admin/experience/${id}`, authConfig(token));
  return data;
}

// Education
export async function getAdminEducation(token) {
  const { data } = await client.get("/api/admin/education", authConfig(token));
  return data.education;
}

export async function createAdminEducation(payload, token) {
  const { data } = await client.post("/api/admin/education", payload, authConfig(token));
  return data.education;
}

export async function updateAdminEducation(id, payload, token) {
  const { data } = await client.put(`/api/admin/education/${id}`, payload, authConfig(token));
  return data.education;
}

export async function deleteAdminEducation(id, token) {
  const { data } = await client.delete(`/api/admin/education/${id}`, authConfig(token));
  return data;
}

// Skills
export async function getAdminSkills(token) {
  const { data } = await client.get("/api/admin/skills", authConfig(token));
  return data.skills;
}

export async function createAdminSkill(payload, token) {
  const { data } = await client.post("/api/admin/skills", payload, authConfig(token));
  return data.skill;
}

export async function updateAdminSkill(id, payload, token) {
  const { data } = await client.put(`/api/admin/skills/${id}`, payload, authConfig(token));
  return data.skill;
}

export async function deleteAdminSkill(id, token) {
  const { data } = await client.delete(`/api/admin/skills/${id}`, authConfig(token));
  return data;
}

// Contact Submissions
export async function getAdminContacts(token) {
  const { data } = await client.get("/api/admin/contacts", authConfig(token));
  return data.contacts;
}

export async function updateAdminContactStatus(id, status, token) {
  const { data } = await client.patch(
    `/api/admin/contacts/${id}/status`,
    { status },
    authConfig(token)
  );
  return data.contact;
}

export async function deleteAdminContact(id, token) {
  const { data } = await client.delete(`/api/admin/contacts/${id}`, authConfig(token));
  return data;
}
