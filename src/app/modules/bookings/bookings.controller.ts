import httpStatus from "http-status";
import sendResponse from "../../utilis/send.response";
import { bookingsServices } from "./bookings.services";
import catchAsync from "../../utilis/catchAsync";

const bookACar = catchAsync(async (req, res, next) => {
    console.log(req.user);
    const data = req.body;
    // console.log(data);
    const result = await bookingsServices.bookACarIntoDB(data,next);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Car booked successfully', data: result })
    }else{
        throw new Error()
    }
})


export const bookingsControllers = {
    bookACar
}