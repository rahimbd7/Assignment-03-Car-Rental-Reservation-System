import { NextFunction } from "express";
import ICars from "./cars.interface";
import AppError from "../../errors/errors";
import httpStatus from "http-status";
import CarsModel from "./cars.model";


const createCarsIntoDB = async(payload:ICars,next:NextFunction)=>{
    try {
     const newCar = await CarsModel.create(payload);
     if(!newCar) throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create car');
     return newCar;
    } catch (error) {
     next(error);
    }
 }

 const getAllCarsFromDB = async(next:NextFunction)=>{
   try {
    const result = await CarsModel.find();
    return result;
   } catch (error) {
    next(error);
   }
 }

 const getACarFromDB= async(id:string, next:NextFunction)=>{
    try {
     const result = await CarsModel.findById(id);
     return result;
    } catch (error) {
     next(error);
    }
  }

const updateACarIntoDB = async(id:string,payload:ICars, next:NextFunction)=>{
    try {
     const result = await CarsModel.findOneAndUpdate({_id:id},payload,{new:true});
     return result;
    } catch (error) {
     next(error);
    }
  }

  const deleteACarFromDB = async(id:string,next:NextFunction)=>{
    try {
     const result = await CarsModel.findOneAndUpdate({_id:id},{isDeleted:true},{new:true});
     return result;
    } catch (error) {
     next(error);
    }
  }

 export const carsServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getACarFromDB,
    updateACarIntoDB,
    deleteACarFromDB
 }