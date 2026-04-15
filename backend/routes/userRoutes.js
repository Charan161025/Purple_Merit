import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getUsers);
router.post("/", protect, createUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;