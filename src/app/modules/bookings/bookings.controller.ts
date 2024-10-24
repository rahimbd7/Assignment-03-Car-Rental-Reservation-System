import httpStatus from "http-status";
import sendResponse from "../../utilis/send.response";
import { bookingsServices } from "./bookings.services";
import catchAsync from "../../utilis/catchAsync";
import { Types } from "mongoose";

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
    const {carId, date} = req.query;
    if (!carId || !date) {
        throw new Error('Please provide carId and date');
    }
    const payloadData = {carId:new Types.ObjectId(carId as string),date: new Date(date as string)}
    const result = await bookingsServices.getAllBookingsFromDB(payloadData);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Bookings retrieved successfully', data: result })
    } else {
        throw new Error('not possible to get bookings')
    }
})


const getUserAllBookings = catchAsync(async (req, res) => {
    const {userId} = req.user
    const result = await bookingsServices.getUserAllBookingsFromDB(userId);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'My Bookings retrieved successfully', data: result })
    } else {
        throw new Error('not possible to get bookings')
    }
})


const returnCar = catchAsync(async (req, res) => {
    const {bookingId,endTime} = req.body;
    const result = await bookingsServices.handleReturnACar(bookingId,endTime);
    if (result) {
        sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Car returned successfully', data: result })
    } else {
        throw new Error('not possible to return car')
    }
})

export const bookingsControllers = {
    bookACar,
    getAllBookings,
    getUserAllBookings,
    returnCar
}