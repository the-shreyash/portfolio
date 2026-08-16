import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    previewImage: { type: String, trim: true },
    image: { type: String, trim: true },
    previewVideo: { type: String, trim: true },
    figmaUrl: { type: String, trim: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    year: { type: String, trim: true, default: "2026" },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Design", designSchema);
