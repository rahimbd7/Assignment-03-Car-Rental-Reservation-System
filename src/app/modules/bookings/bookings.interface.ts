import {  Types } from "mongoose";

interface IBookings {
    date: Date;
    userId?: Types.ObjectId; // Reference to user model
    carId: Types.ObjectId;  // Reference to car model
    startTime: string; // 24-hour format, e.g., "14:00"
    endTime?: string;   // 24-hour format, e.g., "16:00"
    totalCost: number; // Calculated total cost, default 0
  }
export default IBookings 