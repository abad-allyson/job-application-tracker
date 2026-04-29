import express from "express";
import { useJobApplicationController } from "../controllers/job.application.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

export default function useJobApplicationRoute() {
  const { getByUserId, getById, add, updateById, deleteById, updateStatus } =
    useJobApplicationController();

  // Get all
  router.get("/", requireAuth, getByUserId);

  // Get by id
  router.get("/:id", requireAuth, getById);

  // Add new
  router.post("/", requireAuth, add);

  // Update by id
  router.patch("/:id", requireAuth, updateById);

  // Update status by id
  router.patch("/:id/status", requireAuth, updateStatus);

  // Delete by id
  router.delete("/:id", requireAuth, deleteById);

  return router;
}
