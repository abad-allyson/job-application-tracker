import express from "express";
import { useUserController } from "../controllers/user.controller.js";

const router = express.Router();

export default function useUserRoute() {
  const { add, getById } = useUserController();

  router.post("/", add);
  router.get("/id/:id", getById);

  return router;
}
