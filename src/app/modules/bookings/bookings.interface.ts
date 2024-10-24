/* eslint-disable no-unused-vars */
import {   Types } from "mongoose";




interface IBookings {
    date: Date;
    userId?: Types.ObjectId; 
    carId: Types.ObjectId;  
    startTime: string; 
    endTime?: string;   
    totalCost: number; 
    createdAt?: Date;
    updatedAt?: Date;
  }



export default IBookings 