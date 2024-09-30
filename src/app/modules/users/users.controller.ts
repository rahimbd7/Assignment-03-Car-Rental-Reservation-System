import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/send.response";
import { UsersServices } from "./users.services";
import httpStatus  from 'http-status';



const createAUser = catchAsync(async (req, res, next) => {
    const data = req.body;
    // console.log(data);
    const result = await UsersServices.createUserIntoDB(data, next);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'User registered successfully', data: result })
    }else{
        throw new Error()
    }
})


export const UsersController = {
    createAUser
}