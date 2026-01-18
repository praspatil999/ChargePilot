import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from cookies or header
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, please login" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user and attach to request (exclude password)
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User no longer exists" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};
