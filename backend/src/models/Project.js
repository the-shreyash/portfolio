import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    number: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    longDescription: { type: String, trim: true },
    year: { type: String, trim: true, default: "2026" },
    technologies: { type: [String], default: [] },
    capabilities: { type: [String], default: [] },
    role: { type: String, trim: true },
    theme: { type: String, enum: ["finance", "warm", "technical"], default: "finance" },
    image: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    media: [
      {
        type: { type: String, enum: ["image", "video"], default: "image" },
        url: { type: String, required: true },
      },
    ],
    figmaUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    demoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
    caseStudy: {
      problem: { type: String, trim: true },
      solution: { type: String, trim: true },
      architecture: { type: String, trim: true },
      challenges: { type: String, trim: true },
      outcome: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
