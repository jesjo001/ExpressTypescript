import express from 'express';
import {Express, Request, Response} from 'express';
import { createUserHandler } from '../../controller/user.controller'
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from '../../controller/session.controller'
import requiresUser from "../../middleware/validation/requiresUser"
import { userValidationRules, sessionValidationRules, validate } from '../../middleware/validation/validator'
const UserRouter = express.Router();

UserRouter.post('/create', userValidationRules(), validate, createUserHandler)
//User session routes
UserRouter.post('/sessions', sessionValidationRules(), validate, createUserSessionHandler)
UserRouter.delete('/sessions', requiresUser, invalidateUserSessionHandler)
UserRouter.get('/sessions', requiresUser, getUserSessionsHandler )

export default UserRouter;
