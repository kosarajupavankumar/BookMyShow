import express from "express";

import {
  makePayment,
  createBooking,
  getAllBookings,
} from "../controllers/bookingController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/payment", verifyToken, makePayment);

router.post("/bookings", verifyToken, createBooking);

router.get("/", [verifyToken, verifyAdmin], getAllBookings);

export default router;
