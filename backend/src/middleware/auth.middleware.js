import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export async function protect(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
}