import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    type: { type: String, trim: true, default: "Full-Time" },
    location: { type: String, trim: true, default: "India" },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, trim: true, default: "Present" },
    description: { type: String, trim: true },
    achievements: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
