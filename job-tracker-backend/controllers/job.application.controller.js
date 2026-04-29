import Joi from "joi";
import {
  schemaJobApplication,
  schemaJobApplicationUpdate,
} from "../models/job.application.model.js";
import { useJobApplicationRepo } from "../repositories/job.application.repository.js";

export function useJobApplicationController() {
  const {
    getByUserId: _getByUserId,
    getById: _getById,
    add: _add,
    updateById: _updateById,
    deleteById: _deleteById,
    updateStatus: _updateStatus,
  } = useJobApplicationRepo();

  // GET by user ID
  async function getByUserId(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const search = req.query.search ?? "";
    const userId = req.query.userId ?? "";
    const limit = req.query.limit ?? 20;
    try {
      const items = await _getByUserId({ page, search, userId, limit });
      res.status(200).json(items);
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to fetch applications" });
      return;
    }
  }

  // GET by Id
  async function getById(req, res) {
    const validation = Joi.object({
      id: Joi.string().hex().length(24).required(),
    });

    const { error } = validation.validate({ id: req.params.id });
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const items = await _getById(req.params.id);
      res.status(200).json(items);
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get application by id" });
      return;
    }
  }

  // ADD new
  async function add(req, res) {
    const value = req.body;
    const { error } = schemaJobApplication.validate(value);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const message = await _add(value);
      res.status(200).json({ message });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to add application" });
      return;
    }
  }

  // UPDATE
  async function updateById(req, res) {
    const id = req.params.id;
    const payload = { id, ...req.body };

    const { error } = schemaJobApplicationUpdate.validate(payload);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const message = await _updateById(id, req.body);
      res.status(200).json({ message });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get update" });
      return;
    }
  }

  // UPDATE status
  async function updateStatus(req, res) {
    const id = req.params.id;
    const payload = { id, ...req.body };

    const validation = Joi.object({
      id: Joi.string().hex().length(24).required(),
      status: Joi.string()
        .valid(
          "applied",
          "for-interview",
          "for-assessment",
          "awaiting-feedback",
          "offer-received",
          "rejected",
        )
        .required(),
    });
    const { error } = validation.validate(payload);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const message = await _updateStatus(id, req.body);
      res.status(200).json({ message });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get update" });
      return;
    }
  }

  // DELETE
  async function deleteById(req, res) {
    const id = req.params.id;

    const validation = Joi.object({
      id: Joi.string().hex().length(24).required(),
    });

    const { error } = validation.validate({ id });
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const message = await _deleteById(id);
      res.status(200).json({ message });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get delete application" });
      return;
    }
  }

  return { add, getByUserId, getById, updateById, deleteById, updateStatus };
}
