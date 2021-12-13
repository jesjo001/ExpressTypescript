import express from 'express';
import {Express, Request, Response} from 'express';


const Router = express.Router();

Router.use('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

//User 



export default Router;