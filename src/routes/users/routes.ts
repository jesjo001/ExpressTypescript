import express from 'express';
import { 
    createUserHandler,
} from '../../controller/user.controller';
import {
createStudentHandler,
} from "../../controller/student.controller"
import requiresUser from "../../middleware/validation/requiresUser";
import {
     userValidationRules,
     studentValidationRules, 
     sessionValidationRules, 
     counsellorValidationRules,
     validate 
} from '../../middleware/validation/validator'
import { 
    createUserSessionHandler, 
    getUserSessionsHandler, 
    invalidateUserSessionHandler
} from '../../controller/session.controller';

const UserRouter = express.Router();

// create user / admins
UserRouter.post('/create', userValidationRules(), validate, createUserHandler)

//User session routes (login, logout, refresh session)
UserRouter.post('/sessions', sessionValidationRules(), validate, createUserSessionHandler)
UserRouter.delete('/sessions', requiresUser, invalidateUserSessionHandler)
UserRouter.get('/sessions', requiresUser, getUserSessionsHandler )

//you can also login with the login route
UserRouter.post('/login', sessionValidationRules(), validate, createUserSessionHandler)
UserRouter.delete('/logout', requiresUser, invalidateUserSessionHandler)


// //student user common routes
// UserRouter.post('/student/create', studentValidationRules(), validate, createStudentHandler)
// //counselor user common routes
// UserRouter.post('/counselor/create', counsellorValidationRules(), validate, createCounsellorHandler)

// //organization routes


export default UserRouter;
