/* eslint-disable no-unused-vars */
import {  Model, Types } from "mongoose";

export interface IBookingsTime  {
  startTime: string;
  endTime?: string;
}


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


  export interface IBookingsModel extends Model<IBookings>{
    isCarAvailable(
      carId: Types.ObjectId,
      date: Date,
      startTime: string,
      endTime?: string,
     
  ): Promise<boolean>;
  }
export default IBookings 