/* eslint-disable @typescript-eslint/no-explicit-any */
import CarsModel from "../cars/cars.model";
import IBookings from "./bookings.interface";
import BookingsModel from "./bookings.model";

import mongoose from 'mongoose';
import calculateTotalCost from "./bookings.utils";

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


const getAllBookingsFromDB = async (payload: Partial<Pick<IBookings, "carId" | "date">>) => {
    
    const query = Object.keys(payload).length > 0 ? payload : {};

    const bookings = await BookingsModel.find(query)
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



const handleReturnACar = async (bookingId: string, endTime: string) => {
    const session = await mongoose.startSession(); // Start a session for transaction
    session.startTransaction(); // Start the transaction

    try {
        //  Find the booking by bookingId
        const booking = await BookingsModel.findById(bookingId).session(session);
        if (!booking) {
            return { 
                success: false, 
                statusCode: 404, 
                message: "No Data Found", 
                data: [] 
            };
        }

        // Fetch car data
        const car = await CarsModel.findById(booking.carId).session(session);
        if (!car) {
            return { 
                success: false, 
                statusCode: 404, 
                message: "No Data Found", 
                data: [] 
            };
        }

        //  Update booking with the new endTime
        booking.endTime = endTime;

        // Calculate the total cost using the calculateTotalCost function
        const totalCost = calculateTotalCost({
            startTime: booking.startTime,
            endTime: endTime,
            pricePerHour: car.pricePerHour, 
        });
        booking.totalCost = totalCost;

        // Save the updated booking
        await booking.save({ session });

        // Update the car status to "available"
        car.status = 'available';
        await car.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate the booking details and return the response
        const populatedBooking = await (await booking.populate({
            path: 'userId',
            select: 'name email role phone address',
        })).populate({
            path: 'carId',
            select: 'name description color isElectric status features pricePerHour isDeleted createdAt updatedAt',
        }); 

        return {
            success: true,
            statusCode: 200,
            message: 'Car returned successfully',
            data: {
                _id: booking._id,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                user: populatedBooking.userId,
                car: populatedBooking.carId,
                totalCost: booking.totalCost,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
            }
        };

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message);
    }
};


export const bookingsServices = {
    bookACarIntoDB,
    getAllBookingsFromDB,
    getUserAllBookingsFromDB,
    handleReturnACar
};
