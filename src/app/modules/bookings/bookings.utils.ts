import { IBookingsTime } from "./bookings.interface";

export const hasBookingsTimeConflict = (existingTime: IBookingsTime, newBooking: IBookingsTime): boolean => {
    const existingStartTime = new Date(`1970-01-01T${existingTime.startTime}:00`);
    const existingEndTime = existingTime.endTime ? new Date(`1970-01-01T${existingTime.endTime}:00`) : null;

    const newStartTime = new Date(`1970-01-01T${newBooking.startTime}:00`);
    const newEndTime = newBooking.endTime ? new Date(`1970-01-01T${newBooking.endTime}:00`) : null;

    // Check if there is an ongoing booking
    if (existingEndTime === null) {
        return true; // Conflict if there's an ongoing booking
    }

    // Check for time overlap
    const isConflict =
        (newStartTime < existingEndTime && newStartTime >= existingStartTime) || // New start time is within an existing booking
        (newEndTime && newEndTime > existingStartTime && newEndTime <= existingEndTime); // New end time overlaps with existing booking

    return isConflict||false;
};
