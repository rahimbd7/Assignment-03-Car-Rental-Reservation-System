import IBookings from "./bookings.interface";
import BookingsModel from "./bookings.model";

const bookACarIntoDB = async (payload: Pick<IBookings, "carId" | "date" | "startTime">, userId: string,) => {
    const bookingsData = {
        ...payload,
        userId: userId,
        endTime: null,
        totalCost: 0
    };

    const isAvailable = await BookingsModel.isCarAvailable(bookingsData.carId, bookingsData.date, bookingsData?.startTime);
    if (!isAvailable) {
        return Promise.reject(new Error('Car is not available to this schedule'));
    }

    const newBooking = await BookingsModel.create(bookingsData);
    if (!newBooking) {
        return Promise.reject(new Error('Failed to create booking'));
    }

    const populateBookingsDataAsResponse = await BookingsModel.findById(newBooking._id)
        .populate({ path: 'userId', select: 'name email role phone address createdAt updatedAt', model: 'users' })
        .populate({ path: 'carId', select: 'name description color isElectric status features pricePerHour isDeleted createdAt updatedAt', model: 'cars' })
        .lean();

    if (!populateBookingsDataAsResponse) {
        return Promise.reject(new Error('Failed to populate booking data'));
    }

    const { userId: populatedUserId, carId: populatedCarId, ...rest } = populateBookingsDataAsResponse;
    const finalResponse = {
        ...rest,
        user: populatedUserId,
        car: populatedCarId
    };

    return finalResponse;
};

export const bookingsServices = {
    bookACarIntoDB
};
