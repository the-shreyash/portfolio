export function adminAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return res.status(500).json({ success: false, message: "Admin access is not configured." });
  }

  if (!token || token !== expected) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  next();
}
