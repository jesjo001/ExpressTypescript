import express from "express";
import requiresAdmin from "../../middleware/validation/requireAdmin";
import {
  organizationValidationRules,
  validate,
} from "../../middleware/validation/validator";
import {
  createOrganizationHandler,
  getOrganizationHandler,
  getAllOrganizationHandler,
  deleteOrganizationHandler,
} from "../../controller/org.controller";

const OrganizationRouter = express.Router();

//counselor user common routes
// OrganizationRouter.use(requiresAdmin);
OrganizationRouter.post(
  "/create",
  organizationValidationRules(),
  validate,
  createOrganizationHandler
);
OrganizationRouter.get("/get/:orgId", getOrganizationHandler);
OrganizationRouter.get("/get", getAllOrganizationHandler);
OrganizationRouter.delete("/:orgId", deleteOrganizationHandler);

export default OrganizationRouter;
