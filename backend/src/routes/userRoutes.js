import express from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile); // Fetch user data
router.put("/profile/update", protect, updateUserProfile); // Update user data
router.delete("/profile/delete", protect, deleteUserProfile); // Delete user profile

export default router;