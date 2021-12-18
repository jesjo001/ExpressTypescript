import express from 'express';
import {Request, Response} from 'express';
import UserRouter from './users/routes';
import PostRouter from './post/routes';
import OrganizationRouter from './organization/router';
import CounselorRouter from "./counsellor/router";
import EventRouter from "./events/router";
import StudentRouter from "./student/router"
const Router = express.Router();

Router.use('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

//Routes
Router.use('/user', UserRouter);
Router.use('/post', PostRouter);
Router.use('/org', OrganizationRouter);
Router.use('/counselor', CounselorRouter);
Router.use('/event', EventRouter);
Router.use('/student', StudentRouter);

export default Router;