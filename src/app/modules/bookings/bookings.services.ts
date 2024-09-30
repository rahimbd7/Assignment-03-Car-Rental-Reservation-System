import { NextFunction } from "express";
import IBookings from "./bookings.interface";
import BookingsModel from "./bookings.model";

const bookACarIntoDB = async (payload: Pick<IBookings, "carId" | "date" | "startTime">, userId:string,next: NextFunction) => {
    const bookingsData = {
        ...payload,
        userId: userId,
        endTime:null,
        totalCost: 0
    }

    try {
        const newBooking = await BookingsModel.create(bookingsData);
        if (!newBooking) {
            throw new Error();
        } 
    
        const populateBookingsDataAsResponse = await BookingsModel.findById(newBooking._id)
        .populate({ path: 'userId', select: 'name email role phone address createdAt updatedAt', model: 'users' }) 
        .populate({ path: 'carId', select: 'name description color isElectric status features pricePerHour isDeleted createdAt updatedAt', model: 'cars' }) 
        .lean(); 
      
      if (!populateBookingsDataAsResponse) {
          throw new Error();
      }
      
      const { userId, carId, ...rest } = populateBookingsDataAsResponse; // 
      const finalResponse = {
        ...rest,
        user: userId,  
        car: carId    
      };
      return finalResponse;
    } catch (error) {
        next(error);
    }
}


export const bookingsServices = {
    bookACarIntoDB
}