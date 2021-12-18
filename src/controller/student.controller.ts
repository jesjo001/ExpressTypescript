import { omit, get } from "lodash";
import log from "../logger";
import { Request, Response } from "express";
import {
  createStudent,
  findStudent,
  findAllStudents,
  findAndUpdate,
  deleteStudent,
} from "../service/student/student.services";

export const createStudentHandler = async (req: Request, res: Response) => {
  try {
    const userEmail = get(req, "body.email");
    const userPhone = get(req, "body.phoneNum");

    const student = await findStudent({
      $or: [{ email: userEmail }, { phoneNum: userPhone }],
    });

    if (student) {
      return res.status(403).json({
        status: 403,
        message: "Student already exists in our database",
      });
    }

    const newStudent = await createStudent(req.body);

    return res.status(200).json({
      status: 200,
      student: omit(newStudent.toJSON(), "password"),
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

export const getStudentHandler = async (req: Request, res: Response) => {
  try {
    const studentId = get(req, "params.id");
    const student = await findStudent({ _id: studentId });

    if (!student)
      return res.status(404).json({
        status: 404,
        message: "Student not found.",
      });

    return res.status(200).json({
      status: 200,
      student,
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

export const getAllStudentHandler = async (req: Request, res: Response) => {
  try {
    const userRole = get(req, "user.role");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message:
          "You do not have the required permissions to access this route.",
      });
    }

    const students = await findAllStudents();

    if (!students) {
      return res.status(404).json({
        status: 404,
        message: "No Student Found.",
      });
    }

    return res.status(200).json({
      status: 200,
      students,
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

export const deleteStudentHandler = async (req: Request, res: Response) => {
  try {
    const userRole = get(req, "user.role");
    const studentId = get(req, "params.id");

    if (String(userRole) !== "admin") {
      return res.status(401).json({
        status: 401,
        message: "You are not allowed permission to perform this action.",
      });
    }

    const student = await findStudent({ _id: studentId });

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student not found.",
      });
    }

    await deleteStudent({ _id: studentId });

    return res.status(200).json({
      status: 200,
      message: "Student deleted.",
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

export const updateStudentHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const studentId = get(req, "params.id");
    const userRole = get(req, "user.role");
    const update = req.body;

    if (String(studentId) !== String(userId)) {
      if (String(userRole) !== "admin") {
        return res.status(401).json({
          status: 401,
          message:
            "You do not have the required permissions to perform this action.",
        });
      }
    }

    const student = await findStudent({ _id: studentId });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Invalid parameter. Student not found." });
    }

    const updatedStudent = await findAndUpdate({ _id: studentId }, update, {
      new: true,
    });

    return res.status(200).json({ status: 200, student: updatedStudent });
  } catch (err) {
    //log error with logger which doesn't block i/o like console.log does
    log.error(err);
    return res.status(500).json({
      status: 500,
      message: "Ops something went wrong. Please try again later!!",
    });
  }
};
