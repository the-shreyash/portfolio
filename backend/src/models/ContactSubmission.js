import mongoose from "mongoose";

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    company: { type: String, trim: true, maxlength: 160, default: "" },
    projectType: {
      type: String,
      enum: [
        "AI Product",
        "Web Application",
        "SaaS",
        "Portfolio",
        "E-commerce",
        "Automation",
        "Other",
        "",
      ],
      default: "",
    },
    budget: { type: String, trim: true, maxlength: 80, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactSubmission", contactSubmissionSchema);
