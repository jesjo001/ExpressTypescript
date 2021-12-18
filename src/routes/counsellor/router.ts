import express from "express";
import requiresAdmin from "../../middleware/validation/requireAdmin";
import requiresUser from "../../middleware/validation/requiresUser";
import {
  counsellorValidationRules,
  validate,
} from "../../middleware/validation/validator";
import { 
    createCounselorHandler, 
    getCounsellorHandler,
    getAllCounsellorHandler, 
    deleteCounsellorHandler, 
    updateCounselorHandler,
} from "../../controller/counselor.controller"

const CounselorRouter = express.Router();

//authenticate these routes
CounselorRouter.use(requiresUser);
//create a counselor
CounselorRouter.post("/create", counsellorValidationRules(), validate, createCounselorHandler)
//update a counselor
CounselorRouter.put("/update/:id", counsellorValidationRules(), validate, updateCounselorHandler)
//fetch a counsellor
CounselorRouter.get("/get/:id", getCounsellorHandler)
//delete a counsellor
CounselorRouter.delete("/del/:id", deleteCounsellorHandler)
//get all counsellors
//only admins can access this route
CounselorRouter.get("/get", requiresAdmin, getAllCounsellorHandler)


export default CounselorRouter;