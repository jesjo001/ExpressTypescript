import { Request, Response } from "express";
import {
  createUser,
  findUser,
  createStudent,
  createCounsellor,
} from "../service/users/createUser";
import User, { UserDocument } from "../model/user.model";
import { omit, get } from "lodash";
import log from "../logger";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const userEmail = get(req, "body.email");
    const userName = get(req, "body.username");

    const userExist = await findUser({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (userExist) {
      return res.status(403).json({
        status: 403,
        message: " User with same phone already exists",
      });
    }

    if (req.body.phoneNum) {
      const userPhone = get(req, "body.phoneNum");

      const userPhoneExist = await findUser({
        phoneNum: userPhone,
      });

      if (userPhoneExist) {
        return res.status(403).json({
          status: 403,
          message: " User with same phone already exists",
        });
      }
    }

    if (userExist) {
      return res.status(403).json({
        status: 403,
        message: " User with same email / username / phone already exists",
      });
    }

    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error) {
    const newError = error as any;
    log.error(newError);
    res.status(409).send(newError.message);
  }
};

export const createStudentHandler = async (req: Request, res: Response) => {
  try {
    const user = await createStudent(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error) {
    const newError = error as any;
    log.error(newError);
    res.status(409).send(newError.message);
  }
};

export const createCounsellorHandler = async (req: Request, res: Response) => {
  try {
    const user = await createCounsellor(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error) {
    const newError = error as any;
    log.error(newError);
    res.status(409).send(newError.message);
  }
};

export const createUserSessionHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error) {
    const newError = error as any;
    log.error(newError);
    res.status(409).send(newError.message);
  }
};
