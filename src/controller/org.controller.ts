import { omit, get } from "lodash";
import log from "../logger";
import { Request, Response } from "express";
import {
  createOrganization,
  deleteOrg,
  findOrg,
  findAllOrg,
} from "../service/organization/org.services";

export const createOrganizationHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const orgEmail = get(req, "body.email");
    const orgWeb = get(req, "body.website");
    const orgPhone = get(req, "body.phoneNum");

    const orgExist = await findOrg({
      $or: [{ email: orgEmail }, { website: orgWeb }, { phoneNum: orgPhone }],
    });

    if (orgExist) {
      return res.status(403).json({
        status: 403,
        message: "Organization already exists in our database",
      });
    }

    const org = await createOrganization(req.body);
    return res.status(200).json({
      status: 200,
      organization: org,
    });
  } catch (error) {
    log.error(error);
    throw new Error(error as any);
  }
};

export const getOrganizationHandler = async (req: Request, res: Response) => {
  try {
    const userRole = get(req, "user.role");
    const orgId = get(req, "params.orgId");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message: "You are not allowed to delete this organization.",
      });
    }

    const org = await findOrg({ _id: orgId });

    if (!org)
      return res.status(404).json({
        status: 404,
        message: "Organization not found.",
      });

    return res.status(200).json({
      status: 200,
      organization: org,
    });
  } catch (err) {
    //log error with logger which doesn't block i/o like console.log does
    log.error(err);
    return res.status(500).json({
      status: 500,
      message: "Ops something went wrong. Please try again later!!",
    });
  }
};

export const getAllOrganizationHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userRole = get(req, "user.role");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message: "You are not allowed to delete this organization.",
      });
    }

    const orgs = await findAllOrg();

    if (!orgs)
      return res.status(404).json({
        status: 404,
        message: "No Organization found.",
      });

    return res.status(200).json({
      status: 200,
      organizations: orgs,
    });
  } catch (err) {
    //log error with logger which doesn't block i/o like console.log does
    log.error(err);
    return res.status(500).json({
      status: 500,
      message: "Ops something went wrong. Please try again later!!",
    });
  }
};

export const deleteOrganizationHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userRole = get(req, "user.role");
    const orgId = get(req, "params.orgId");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message: "You are not allowed to delete this organization.",
      });
    }

    const org = await findOrg({ _id: orgId });

    if (!org)
      return res.status(404).json({
        status: 404,
        message: "Organization not found.",
      });

    await deleteOrg({ _id: orgId });

    return res.status(200).json({
      status: 200,
      message: "Organization deleted.",
    });
  } catch (error) {
    const newError = error as any;
    log.error(newError);
    res.status(409).send(newError.message);
  }
};
