import express from "express";
import {
  studentValidationRules,
  validate,
} from "../../middleware/validation/validator";
import {
createStudentHandler,
getStudentHandler,
getAllStudentHandler,
deleteStudentHandler,
updateStudentHandler,
} from "../../controller/student.controller"
import requiresUser from "../../middleware/validation/requiresUser";


const StudentRouter = express.Router();

StudentRouter.use(requiresUser)
StudentRouter.post("/create", studentValidationRules(), validate, createStudentHandler )
StudentRouter.get("/get", getAllStudentHandler)
StudentRouter.get("/:id", getStudentHandler )
StudentRouter.delete("/del/:id",  deleteStudentHandler )
StudentRouter.put("/update/:id",  updateStudentHandler )

export default StudentRouter;