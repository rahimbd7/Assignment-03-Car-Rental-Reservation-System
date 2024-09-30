import { NextFunction } from "express";
import IBookings from "./bookings.interface";
import BookingsModel from "./bookings.model";

const bookACarIntoDB = async (payload: Pick<IBookings, "carId" | "date" | "startTime">, next: NextFunction) => {

    try {
        const newBooking = await BookingsModel.create(payload);
        if (!newBooking) {
            throw new Error();
        } 
        return newBooking;
    } catch (error) {
        next(error);
    }
}


export const bookingsServices = {
    bookACarIntoDB
}