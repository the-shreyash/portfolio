import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const secret = process.env.JWT_SECRET || process.env.ADMIN_TOKEN || "portfolio-jwt-fallback-secret-key";
    
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      // Also support direct ADMIN_TOKEN match for backwards compatibility or simple token usage
      if (process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN) {
        req.user = { username: "admin", role: "superadmin" };
        return next();
      }
      return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }

    const user = await AdminUser.findById(decoded.id).select("-password");
    if (!user) {
      // If user was deleted or created via env token
      if (decoded.username) {
        req.user = decoded;
        return next();
      }
      return res.status(401).json({ success: false, message: "User no longer exists." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("[jwtAuth error]", err.message);
    res.status(500).json({ success: false, message: "Authentication failure." });
  }
}
