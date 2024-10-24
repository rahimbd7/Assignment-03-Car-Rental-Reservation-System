import { Schema,  model } from 'mongoose';
import IBookings from './bookings.interface';


const BookingsSchema = new Schema<IBookings>({
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    carId: { type: Schema.Types.ObjectId, ref: 'cars', required: true },
    startTime: { type: String, required: true, match: /^[0-2][0-9]:[0-5][0-9]$/ },
    endTime: { type: String, default: null, match: /^[0-2][0-9]:[0-5][0-9]$/ },
    totalCost: { type: Number, default: 0 },
},{
    timestamps: true
});














const BookingsModel = model<IBookings>('bookings', BookingsSchema);

export default BookingsModel;
