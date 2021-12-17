import { Request, Response } from 'express';
import { createUser } from '../service/users/createUser';
import { omit } from 'lodash'
import log from '../logger'

export const createUserHandler = async (req: Request, res: Response) => {

    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), 'password'));
    } catch (error) {
        const newError = error as any;
        log.error(newError);
        res.status(409).send(newError.message);
    }
}

export const createUserSessionHandler = async (req: Request, res: Response) => {

    try { 
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), 'password'));
    } catch (error) {
        const newError = error as any;
        log.error(newError);
        res.status(409).send(newError.message);
    }
}