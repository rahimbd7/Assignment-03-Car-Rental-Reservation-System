import IBookings from "./bookings.interface";

const calculateTotalCost = (payload: Pick<IBookings, "startTime" | "endTime"> & { pricePerHour: number }): number => {
    const { startTime, endTime, pricePerHour } = payload;

    if (!endTime) {
        throw new Error("End time must be provided.");
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startInHours = startHour + startMinute / 60;
    const endInHours = endHour + endMinute / 60;

    // Check if endTime is earlier than startTime
    if (endInHours < startInHours) {
        throw new Error("End time cannot be earlier than start time.");
    }

    const duration = endInHours - startInHours;

    return duration * pricePerHour;
};

export default calculateTotalCost;
