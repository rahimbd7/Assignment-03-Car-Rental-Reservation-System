/* eslint-disable @typescript-eslint/no-explicit-any */
import CarsModel from "../cars/cars.model";
import IBookings from "./bookings.interface";
import BookingsModel from "./bookings.model";

import mongoose from 'mongoose';

const bookACarIntoDB = async (
    payload: Pick<IBookings, "carId" | "date" | "startTime">,
    userId: string,
) => {
    const session = await mongoose.startSession(); // Start the session
    session.startTransaction(); // Begin the transaction

    try {
        const bookingsData = {
            ...payload,
            userId: userId,
            endTime: null,
            totalCost: 0
        };

        // Check if the car is available
        const isAvailable = await CarsModel.isCarAvailable(bookingsData.carId);
        if (!isAvailable) {
            throw new Error('Car is not available for this schedule');
        }

        // Create the booking inside the transaction
        const newBooking = await BookingsModel.create([bookingsData], { session });
        if (!newBooking) {
            throw new Error('Failed to create booking');
        }

        // Update the car status to 'unavailable' inside the transaction
        const updatedCar = await CarsModel.findByIdAndUpdate(
            bookingsData.carId,
            { status: 'unavailable' },
            { new: true, session }
        );
        if (!updatedCar) {
            throw new Error('Failed to update car status');
        }

        // Commit the transaction after both operations succeed
        await session.commitTransaction();
        session.endSession();

      
        const populatedBooking = await BookingsModel.findById(newBooking[0]._id)
            .populate({ path: 'userId', select: 'name email role phone address createdAt updatedAt', model: 'users' })
            .populate({ path: 'carId', select: 'name description color isElectric status features pricePerHour isDeleted createdAt updatedAt', model: 'cars' })
            .lean();

        if (!populatedBooking) {
            throw new Error('Failed to populate booking data');
        }

  
        const { userId: populatedUserId, carId: populatedCarId, ...rest } = populatedBooking;
        const finalResponse = {
            ...rest,
            user: populatedUserId,
            car: populatedCarId
        };

        return finalResponse;

    } catch (error:any) {
        // Abort the transaction in case of any error
        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message);
    }
};





const getAllBookingsFromDB = async (payload: Pick<IBookings, "carId" | "date">) => {
    const bookings = await BookingsModel.find(payload)
        .populate({
            path: 'userId',
            select: 'name email role phone address createdAt updatedAt',
            model: 'users'
        })
        .populate({
            path: 'carId',
            select: 'name description color isElectric status features pricePerHour isDeleted createdAt updatedAt',
            model: 'cars'
        })
        .lean();

    if (!bookings) {
        throw new Error('Failed to fetch bookings');
    }

    return bookings.map(booking => ({
        _id: booking._id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime || null,  
        user: booking.userId,
        car: booking.carId,
        totalCost: booking.totalCost || 0, 
        createdAt: booking?.createdAt,
        updatedAt: booking?.updatedAt
    }));
};



const getUserAllBookingsFromDB = async (userId: string) => {
    const bookings = await BookingsModel.find({ userId })
        .populate({
            path: 'userId',
            select: 'name email role phone address createdAt updatedAt',
            model: 'users'
        })
        .populate({
            path: 'carId',
            select: 'name description color isElectric status features pricePerHour isDeleted createdAt updatedAt',
            model: 'cars'
        })
        .lean();

    if (!bookings) {
        throw new Error('Failed to fetch bookings');
    }

    return bookings.map(booking => ({
        _id: booking._id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime || null,  
        user: booking.userId,
        car: booking.carId,
        totalCost: booking.totalCost || 0, 
        createdAt: booking?.createdAt,
        updatedAt: booking?.updatedAt
    }))
};


// const handleCarReturn = async (bookingId: string,endTime:string) => {
    
// }

export const bookingsServices = {
    bookACarIntoDB,
    getAllBookingsFromDB,
    getUserAllBookingsFromDB
};
