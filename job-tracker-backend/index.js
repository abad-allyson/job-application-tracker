import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// App Config - Initialize Express application
const app = express();
app.use(cookieParser());

import { PORT, MONGO_URI, MONGO_DB } from "./config.js";

// Database Connection
const client = new MongoClient(MONGO_URI);
async function connectToDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB");
}

// Middleware Pipeline
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

export let db;

import useAuthRoute from "./routes/auth.route.js";
import useJobApplicationRoute from "./routes/job.application.route.js";
import useUserRoute from "./routes/user.route.js";

import setup from "./setup.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { logger } from "./utils/logger.util.js";

// Application Startup
connectToDB().then(async () => {
  db = client.db(MONGO_DB);

  try {
    await setup();
    console.log("Successfully ran setup script");
  } catch (error) {
    console.error("Failed to run setup script:", error.message);
  }

  // Routes will be added here later
  app.use("/api/auth", useAuthRoute());
  app.use("/api/job-applications", useJobApplicationRoute());
  app.use("/api/users", useUserRoute());

  // Error handling middleware (must be last)
  app.use(errorHandler);

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    logger.log({
      level: "info",
      message: `🚀 Server running at http://localhost:${PORT}`,
    });
  });
});
