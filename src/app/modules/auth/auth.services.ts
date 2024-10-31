import httpStatus from 'http-status'
import AppError from '../../errors/errors'
import { UsersModel } from '../users/users.model'
import IAuth from './auth.interface'
import { createToken } from './auth.utils'
import config from '../../../config'

const loginUser = async function (payload: IAuth) {
  const user = await UsersModel.isUserExists(payload?.email)
  //check if user is exists or not
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not found')
  }
  //check if the password has matched or not
  if (
    !(await UsersModel.isPasswordMatched(
      payload?.password,
      user?.password as string,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched')
  }
  //create jwt access token
  const jwtPayLoad = {
    userEmail: user?.email,
    role: user?.role,
    userId: user._id ? user._id.toString() : '',
  }
  const accessToken = createToken(
    jwtPayLoad,
    config.jwt_access_secret as string,
    config.access_token_expiresIn as string,
  )
  return {
    data: user,
    accessToken,
  }
}

export const AuthServices = {
  loginUser,
}
