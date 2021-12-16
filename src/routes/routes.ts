import express from 'express';
import {Express, Request, Response} from 'express';
import UserRouter from './users/routes';

const Router = express.Router();

Router.use('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

//User 
Router.use('/user', UserRouter);
//Login

//Logout



export default Router;