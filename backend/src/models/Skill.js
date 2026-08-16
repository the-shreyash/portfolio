import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "AI", "Infrastructure", "Tools", "Design", "General"],
      default: "General",
    },
    name: { type: String, required: true, trim: true },
    level: { type: String, trim: true, default: "Proficient" },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
