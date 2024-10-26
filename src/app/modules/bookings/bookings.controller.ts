import httpStatus from "http-status";
import sendResponse from "../../utilis/send.response";
import { bookingsServices } from "./bookings.services";
import catchAsync from "../../utilis/catchAsync";
import { Types } from "mongoose";
import IBookings from "./bookings.interface";

const bookACar = catchAsync(async (req, res) => {
    const { carId, date, startTime } = req.body;
    const data = { carId, date, startTime }, {userId} = req.user
    const result = await bookingsServices.bookACarIntoDB(data, userId);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Car booked successfully', data: result })
    } else {
        throw new Error('not possible to book car')
    }
})



const getAllBookings = catchAsync(async (req, res) => {
    const { carId, date } = req.query;
    const payloadData: Partial<Pick<IBookings, "carId" | "date">> = {};
    if (carId) payloadData.carId = new Types.ObjectId(carId as string);
    if (date) payloadData.date = new Date(date as string);

    const result = await bookingsServices.getAllBookingsFromDB(payloadData);
    if (result && result.length > 0) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Bookings retrieved successfully', data: result });
    } else {
        sendResponse(res, { statusCode: httpStatus.NOT_FOUND, success: false, message: 'No Data Found', data: [] });
    }
});



const getUserAllBookings = catchAsync(async (req, res) => {
    const {userId} = req.user
    const result = await bookingsServices.getUserAllBookingsFromDB(userId);
    if (result && result.length > 0) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'My Bookings retrieved successfully', data: result });
    } else {
        sendResponse(res, { statusCode: httpStatus.NOT_FOUND, success: false, message: 'No Data Found', data: [] });
    }
})


const returnCar = catchAsync(async (req, res) => {
    const {bookingId,endTime} = req.body;
    const result = await bookingsServices.handleReturnACar(bookingId,endTime);
    if(!result.success) return sendResponse(res, { statusCode: httpStatus.BAD_REQUEST, success: false, message: result.message, data: result.data })
  else{
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Car returned successfully', data: result })
    } 
})

export const bookingsControllers = {
    bookACar,
    getAllBookings,
    getUserAllBookings,
    returnCar
}