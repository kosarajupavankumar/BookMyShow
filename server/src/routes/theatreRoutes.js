import express from "express";

import {
  addTheatre,
  getTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
} from "../controllers/theatreController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new Theatre

router.post("/", addTheatre);

router.get("/", [verifyToken], getTheatres);

router.get("/:id", getTheatreById);

router.patch("/:id", updateTheatre);

router.delete("/:id", deleteTheatre);

export default router;
