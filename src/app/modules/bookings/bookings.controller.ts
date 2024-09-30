import httpStatus from "http-status";
import sendResponse from "../../utilis/send.response";
import { bookingsServices } from "./bookings.services";
import catchAsync from "../../utilis/catchAsync";

const bookACar = catchAsync(async (req, res, next) => {
    const { carId, date, startTime } = req.body;
    const data = { carId, date, startTime }, {userId} = req.user
    const result = await bookingsServices.bookACarIntoDB(data, userId, next);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Car booked successfully', data: result })
    } else {
        throw new Error()
    }
})


export const bookingsControllers = {
    bookACar
}