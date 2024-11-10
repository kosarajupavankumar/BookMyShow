import express from "express";

import {
  addShow,
  getShows,
  getShowById,
  updateShow,
  deleteShow,
} from "../controllers/showController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", [verifyToken, verifyAdmin], addShow);

router.get("/", [verifyToken, verifyAdmin], getShows);

router.get("/:id", [verifyToken, verifyAdmin], getShowById);

router.patch("/:id", [verifyToken, verifyAdmin], updateShow);

router.delete("/:id",[verifyToken, verifyAdmin], deleteShow);

export default router;
