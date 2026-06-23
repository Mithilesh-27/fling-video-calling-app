import express from 'express';
import { registerUser, loginUser, logoutUser, onboardUser } from "../controllers/auth.controller.js";
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/onboarding", protect, onboardUser);
router.get("/check-auth", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;