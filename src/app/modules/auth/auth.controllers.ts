import httpStatus from 'http-status'
import catchAsync from '../../utilis/catchAsync'
import sendResponse from '../../utilis/send.response'
import { AuthServices } from './auth.services'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result?.data,
    token: result?.accessToken as string,
  })
})

export const AuthControllers = {
  loginUser,
}
