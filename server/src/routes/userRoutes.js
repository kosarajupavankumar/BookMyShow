import express from "express";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a new user

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", verifyToken, getCurrentUser);

router.patch("/forgotPassword", forgotPassword);

router.patch("/resetPassword", resetPassword);

export default router;
