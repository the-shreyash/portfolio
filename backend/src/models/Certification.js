import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, trim: true },
    type: { type: String, trim: true, default: "COURSE CERTIFICATE" },
    imageUrl: { type: String, trim: true },
    url: { type: String, trim: true },
    credentialId: { type: String, trim: true },
    verificationUrl: { type: String, trim: true },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
