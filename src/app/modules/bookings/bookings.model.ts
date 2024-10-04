import { Schema, Types, model } from 'mongoose';
import IBookings, { IBookingsModel, IBookingsTime } from './bookings.interface';
import { hasBookingsTimeConflict } from './bookings.utils';

const BookingsSchema = new Schema<IBookings,IBookingsModel>({
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    carId: { type: Schema.Types.ObjectId, ref: 'cars', required: true },
    startTime: { type: String, required: true, match: /^[0-2][0-9]:[0-5][0-9]$/ },
    endTime: { type: String, default: null, match: /^[0-2][0-9]:[0-5][0-9]$/ },
    totalCost: { type: Number, default: 0 },
});

BookingsSchema.statics.isCarAvailable = async function (
    carId: Types.ObjectId,
    date: Date,
    startTime: string,
    endTime?: string
) {
    // Fetch any existing bookings on the same date for the car
    const existingBookings = await this.find({
        carId,
        date,
    }).select('startTime endTime');

    // Create the new booking object for checking
    const newBooking: IBookingsTime = { startTime, endTime };

    for (const booking of existingBookings) {
        const existingBooking: IBookingsTime = {
            startTime: booking.startTime,
            endTime: booking.endTime
        };
        if (hasBookingsTimeConflict(existingBooking, newBooking)) {
            return false; 
        }
    }
    return true;
};












const BookingsModel = model<IBookings,IBookingsModel>('bookings', BookingsSchema);

export default BookingsModel;
