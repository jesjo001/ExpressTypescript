import express from 'express';
import {Express, Request, Response} from 'express';
import UserRouter from './users/routes';
import PostRouter from './post/routes'
import OrganizationRouter from './organization/router';
const Router = express.Router();

Router.use('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

//User 
Router.use('/user', UserRouter);
Router.use('/post', PostRouter);
Router.use('/org', OrganizationRouter);
//Login

//Logout



export default Router;