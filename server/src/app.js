// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoConnection from "./config/dbConfig.js";
import movieRoutes from "./routes/movieRoutes.js";
import theatreRoutes from "./routes/theatreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import showRoutes from "./routes/showRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Database connection
const mongoURI = process.env.MONGO_URI;
const mongoConnection = new MongoConnection(mongoURI);
mongoConnection.connect();

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Movie routes
app.use("/movies", movieRoutes);

// Theartre routes
app.use("/theatres", theatreRoutes);

// User routes
app.use("/users", userRoutes);

// show routes
app.use("/shows", showRoutes);

// Booking routes
app.use("/bookings", bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
