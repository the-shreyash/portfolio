import ContactSubmission from "../models/ContactSubmission.js";
import { sendContactNotification } from "../services/emailService.js";

export async function createContactSubmission(req, res, next) {
  try {
    const submission = await ContactSubmission.create(req.body);

    sendContactNotification(submission).catch(() => {});

    res.status(201).json({
      success: true,
      message: "Message received. I'll get back to you soon.",
    });
  } catch (err) {
    next(err);
  }
}

export async function listContactSubmissions(req, res, next) {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, submissions });
  } catch (err) {
    next(err);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found." });
    }

    res.json({ success: true, submission });
  } catch (err) {
    next(err);
  }
}
