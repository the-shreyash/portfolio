import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: "Shreyash Yadav" },
    role: {
      type: String,
      required: true,
      trim: true,
      default: "AI Product Builder & Full-Stack Engineer",
    },
    headline: {
      type: String,
      trim: true,
      default: "I BUILD INTELLIGENT DIGITAL PRODUCTS.",
    },
    bio: {
      type: String,
      trim: true,
      default:
        "I'm a computer science student and builder focused on AI, full-stack engineering and products that solve real problems.",
    },
    location: { type: String, trim: true, default: "India" },
    email: { type: String, trim: true, default: "shs140326@gmail.com" },
    photoUrl: { type: String, trim: true, default: "/profile/shreyash-photo.png" },
    availability: { type: Boolean, default: true },
    availabilityText: { type: String, trim: true, default: "Available for select projects" },
    githubUrl: { type: String, trim: true, default: "https://github.com/the-shreyash" },
    linkedinUrl: {
      type: String,
      trim: true,
      default: "https://www.linkedin.com/in/shreyash-yadav-b15024296/",
    },
    resumeUrl: { type: String, trim: true, default: "" },
    domains: {
      type: [String],
      default: ["AI", "Full-Stack", "Product", "Systems"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
