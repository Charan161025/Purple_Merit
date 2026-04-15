import express from "express";
import {
  createUser,
  getUsers,
  getProfile,
  updateProfile,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/", protect, authorize("admin"), createUser);
router.get("/", protect, authorize("admin", "manager"), getUsers);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.put("/:id", protect, authorize("admin", "manager"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;