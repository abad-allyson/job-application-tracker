import { db } from "../index.js";
import {
  schemaJobApplication,
  modelJobApplication,
  schemaJobApplicationUpdate,
} from "../models/job.application.model.js";
import { ObjectId } from "mongodb";
import { paginate } from "../utils/paginate.util.js";
import { logger } from "../utils/logger.util.js";

export function useJobApplicationRepo() {
  const collection = db.collection("applications");

  if (!db) {
    console.log("Mongodb client is requred");
    logger.log({ level: "error", message: "Mongodb client is requred" });
  }

  // Create Indexes
  async function createJobApplicationIndexes() {
    try {
      await collection.createIndexes([
        { key: { company: 1 } },
        { key: { jobTitle: 1 } },
        { key: { location: 1 } },
        { key: { workSetup: 1 } },
        { key: { workType: 1 } },
        { key: { salary: 1 } },
        { key: { status: 1 } },
        {
          key: {
            company: "text",
            jobTitle: "text",
            location: "text",
            workSetup: "text",
            workType: "text",
            salary: "text",
            status: "text",
          },
          name: "applicationTextSearch",
        },
      ]);
      return "Indexes created successfully.";
    } catch (error) {
      throw new Error("Failed to create indexes: " + error.message);
    }
  }

  // Get all applications
  async function getByUserId({
    page = 1,
    limit = "20",
    search = "",
    userId = "",
  } = {}) {
    page = page > 0 ? page - 1 : page;

    try {
      userId = new ObjectId(userId);
    } catch (error) {
      throw new Error("Invalid user ID.", error);
    }

    const query = { userId };
    limit = parseInt(limit);
    if (search) {
      query.$text = { $search: search };
    }
    try {
      const items = await collection
        .aggregate([
          { $match: query },
          { $skip: page * limit },
          { $limit: limit },
        ])
        .toArray();

      const length = await collection.countDocuments(query);
      return paginate({ items, page, limit, length });
    } catch (error) {
      throw new Error("Failed to fetch applications: " + error.message);
    }
  }

  // Get application by id
  async function getById(id) {
    try {
      id = new ObjectId(id);
    } catch (error) {
      throw new Error("Invalid Id");
    }

    try {
      return await collection.findOne({ _id: id });
    } catch (error) {
      throw new Error("Failed to fetch applications: " + error.message);
    }
  }

  // Add new application
  async function add(value) {
    try {
      value = modelJobApplication(value);
      await collection.insertOne(value);
      return { message: "Successfully created application.", value };
    } catch (error) {
      throw new Error("Failed to add application: " + error.message);
    }
  }

  // Update applications by id
  async function updateById(id, value) {
    try {
      id = new ObjectId(id);
    } catch (error) {
      throw new Error("Invalid ID format");
    }

    const { error } = schemaJobApplicationUpdate.validate(value);
    if (error) {
      throw new Error(
        "Validation failed: " + error.details.map((d) => d.message).join(", "),
      );
    }

    if (value.userId) {
      value.userId = new ObjectId(value.userId);
    }

    try {
      await collection.updateOne(
        { _id: id },
        { $set: { ...value, updatedAt: new Date() } },
      );
      return "Successfully updated application.";
    } catch (error) {
      throw new Error("Failed to fetch applications: " + error.message);
    }
  }

  async function updateStatus(id, status) {
    try {
      id = new ObjectId(id);
    } catch (error) {
      throw new Error("Invalid ID format");
    }

    try {
      await collection.updateOne(
        { _id: id },
        { $set: { ...status, updatedAt: new Date() } },
      );
      return "Successfully updated application status.";
    } catch (error) {
      throw new Error("Failed to update application status: " + error.message);
    }
  }

  // Delete applications by id
  async function deleteById(id) {
    try {
      id = new ObjectId(id);
    } catch (error) {
      throw new Error("Invalid ID format");
    }

    try {
      await collection.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Failed to delete applications: " + error.message);
    }
  }

  return {
    add,
    getByUserId,
    getById,
    updateById,
    deleteById,
    createJobApplicationIndexes,
    updateStatus,
  };
}
