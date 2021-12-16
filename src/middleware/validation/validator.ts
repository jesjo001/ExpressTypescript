import { body, validationResult } from 'express-validator';
import express, { Request, Response, NextFunction } from "express";

export const userValidationRules = () => {
  return [
    // username must not be empty
    body('username').not().isEmpty(),
    // firstName is required
    body('firstName').not().isEmpty(),
    // lastName is required 
    body('lastName').not().isEmpty(),
    
    // role is required
    body('role').not().isEmpty(),
    //validation email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 8 }),
        // password must be at least 5 chars long
    body('passwordConfirmation').isLength({ min: 8 }),
  ]
}

export const sessionValidationRules = () => {
  return [
    //validation email
    body('email').isEmail(),
    // password must be at least 8 chars long
    body('password').isLength({ min: 8 }),
  ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors : any = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}
