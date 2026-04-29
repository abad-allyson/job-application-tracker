import Joi from "joi";
import { schemaUser } from "../models/user.model.js";
import { useUserRepo } from "../repositories/user.repository.js";
import { useUserService } from "../services/user.service.js";

export function useUserController() {
  const {
    getAll: _getAll,
    getById: _getById,
    add: _add,
    updateById: _updateById,
    deleteById: _deleteById,
  } = useUserRepo();

  const { addUser } = useUserService();

  // GET all
  async function getAll(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const status = req.query.status || "active";
    const search = req.query.search ?? "";
    try {
      const items = await _getAll({ page, status, search });
      res.status(200).json(items);
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to fetch users" });
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
      const user = await _getById(req.params.id);
      res.status(200).json(user);
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get user by id" });
      return;
    }
  }

  // ADD new
  async function add(req, res) {
    const value = req.body;
    const { error } = schemaUser.validate(value);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const message = await addUser(value);
      res.status(200).json({ message });
      return;
    } catch (error) {
      res.status(500).json({ message: error.message || "Failed to add user" });
      return;
    }
  }

  // UPDATE
  async function updateById(req, res) {
    const id = req.params.id;
    const payload = { id, ...req.body };
    const { error } = schemaUser.validate(payload);
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
        .json({ message: error.message || "Failed to update user" });
      return;
    }
  }

  // DELETE
  async function deleteById(req, res) {
    const validation = Joi.object({
      id: Joi.string().hex().length(24).required(),
    });

    const { error } = validation.validate(req.params);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.details });
      return;
    }

    try {
      const message = await _deleteById(req.params.id);
      res.status(200).json({ message });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get delete user" });
      return;
    }
  }

  return { add, getAll, getById, updateById, deleteById };
}
