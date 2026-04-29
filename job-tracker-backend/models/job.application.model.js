import Joi from "joi";
import { ObjectId } from "mongodb";

export const schemaJobApplication = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  company: Joi.string().trim().min(1).max(200).required(),
  jobTitle: Joi.string().trim().min(1).max(200).required(),
  location: Joi.string().trim().min(1).max(200).required(),
  workSetup: Joi.string().trim().min(1).max(200).required(),
  workType: Joi.string().trim().min(1).max(200).required(),
  salary: Joi.string().trim().max(200).allow(""),
  link: Joi.string().trim().min(1).max(200).allow("", null),
  notes: Joi.string().trim().max(1000).allow("", null),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  deletedAt: Joi.date().optional(),
});

export const schemaJobApplicationUpdate = Joi.object({
  id: Joi.string().hex().length(24).optional(),
  userId: Joi.string().hex().length(24).required(),
  company: Joi.string().trim().min(1).max(200).required(),
  jobTitle: Joi.string().trim().min(1).max(200).required(),
  location: Joi.string().trim().min(1).max(200).required(),
  workSetup: Joi.string().trim().min(1).max(200).required(),
  workType: Joi.string().trim().min(1).max(200).required(),
  salary: Joi.string().trim().max(200).allow(""),
  link: Joi.string().trim().min(1).max(200).allow("", null),
  notes: Joi.string().trim().max(1000).allow("", null),
  status: Joi.string().optional().allow("", null),
});

export function modelJobApplication(value) {
  const { error } = schemaJobApplication.validate(value);

  if (error) {
    throw new Error(
      "Validation failed: " + error.details.map((d) => d.message).join(", "),
    );
  }

  try {
    value.userId = new ObjectId(value.userId);
  } catch (error) {
    throw new Error("Invalid userId format.");
  }

  return {
    userId: value.userId,
    company: value.company,
    jobTitle: value.jobTitle,
    location: value.location,
    workSetup: value.workSetup,
    workType: value.workType,
    link: value.link ?? "",
    notes: value.notes ?? "",
    salary: value.salary ?? "",
    status: value.status ?? "applied",
    createdAt: new Date(),
    updatedAt: value.updatedAt ?? "",
    deletedAt: value.deletedAt ?? "",
  };
}
