import { omit, get } from "lodash";
import log from "../logger";
import { Request, Response } from "express";
import {
  createCounsellor,
  findCounsellor,
  findAllCounsellor,
  findAndUpdate,
  deleteCounsellor,
} from "../service/counselors/counsellor.services";

export const createCounselorHandler = async (req: Request, res: Response) => {
  try {
    const counselorEmail = get(req, "body.email");
    const counselorPhone = get(req, "body.phoneNum");

    const counselor = await findCounsellor({
      $or: [{ email: counselorEmail }, { phoneNum: counselorPhone }],
    });

    if (counselor) {
      return res.status(403).json({
        status: 403,
        message: "Counselor already exists in our database",
      });
    }

    const newCounselor = await createCounsellor(req.body);

    return res.status(200).json({
      status: 200,
      counselor: omit(newCounselor.toJSON(), "password"),
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

export const getCounsellorHandler = async (req: Request, res: Response) => {
  try {
    const counselId = get(req, "params.id");

    const counselor = await findCounsellor({ _id: counselId });

    if (!counselor)
      return res.status(404).json({
        status: 404,
        message: "Counselor not found.",
      });

    return res.status(200).json({
      status: 200,
      counselor,
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

export const getAllCounsellorHandler = async (req: Request, res: Response) => {
  try {
    const userRole = get(req, "user.role");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message:
          "You do not have the required permissions to access this route.",
      });
    }

    const counselors = await findAllCounsellor();

    if (!counselors) {
      return res.status(404).json({
        status: 404,
        message: "No Counsellor Found.",
      });
    }

    return res.status(200).json({
      status: 200,
      counselors,
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

export const deleteCounsellorHandler = async (req: Request, res: Response) => {
  try {
    const userRole = get(req, "user.role");
    const counselorId = get(req, "params.id");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message: "You are not allowed permission to perform this action.",
      });
    }

    const counselor = await findCounsellor({ _id: counselorId });

    if (!counselor) {
      return res.status(404).json({
        status: 404,
        message: "Counselor not found.",
      });
    }

    await deleteCounsellor({ _id: counselorId });

    return res.status(200).json({
      status: 200,
      message: "Counselor deleted.",
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

export const updateCounselorHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const counselorId = get(req, "params.id");
    const userRole = get(req, "user.role");
    const update = req.body;

    if (String(counselorId) !== String(userId)) {
      if (String(userRole) !== "admin") {
        return res.status(401).json({
          status: 401,
          message:
            "You do not have the required permissions to perform this action.",
        });
      }
    }

    const counselor = await findCounsellor({ counselorId });

    if (!counselor) {
      return res
        .status(404)
        .json({ message: "Invalid parameter. Counselor not found." });
    }

    const updatedCounselor = await findAndUpdate({ _id: counselorId }, update, {
      new: true,
    });

    return res.status(200).json({ status: 200, counselor: updatedCounselor });
  } catch (err) {
    //log error with logger which doesn't block i/o like console.log does
    log.error(err);
    return res.status(500).json({
      status: 500,
      message: "Ops something went wrong. Please try again later!!",
    });
  }
};
