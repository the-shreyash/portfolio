// Centralized profile configuration — single source of truth for all components.
// Update photo path once here and it propagates everywhere.
//
// The photo is imported as an ES module so Vite can fingerprint and
// optimize it correctly in both dev and production builds.
import shreyashPhoto from "./shreyash-photo.png";

export const profile = {
  name: "Shreyash Yadav",
  role: "AI Product Builder & Full-Stack Engineer",
  photo: shreyashPhoto,
  email: "shs140326@gmail.com",
  github: "https://github.com/the-shreyash",
  linkedin: "https://www.linkedin.com/in/shreyash-yadav-b15024296/",
  location: "India",
};
