import express from 'express'
import { UsersController } from '../users/users.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidationSchemas } from '../users/users.validation'
import { AuthControllers } from './auth.controllers'
import { AuthValidation } from './auth.validation'

const authRouter = express.Router()

authRouter.post(
  '/signup',
  validateRequest(userValidationSchemas.createUserValidationSchema),
  UsersController.createAUser,
)

authRouter.post(
  '/signin',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)

export default authRouter
