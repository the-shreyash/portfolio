import nodemailer from "nodemailer";

let transporter = null;

function isEmailConfigured() {
  return Boolean(
    process.env.EMAIL_HOST &&
      process.env.EMAIL_PORT &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASSWORD &&
      process.env.CONTACT_RECEIVER
  );
}

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
}

export async function sendContactNotification(submission) {
  if (!isEmailConfigured()) {
    console.log("[emailService] email not configured, skipping notification");
    return;
  }

  try {
    const mailer = getTransporter();
    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: `New contact submission from ${submission.name}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Company: ${submission.company || "-"}`,
        `Project Type: ${submission.projectType || "-"}`,
        `Budget: ${submission.budget || "-"}`,
        "",
        submission.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[emailService] failed to send notification:", err.message);
  }
}
