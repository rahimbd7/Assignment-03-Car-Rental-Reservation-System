import { NextFunction } from "express";
import IUser from "./users.interface";
import { UsersModel } from "./users.model";
import AppError from "../../errors/errors";
import httpStatus from "http-status";


const createUserIntoDB = async(payload:IUser,next:NextFunction)=>{
   try {
    const newUser = await UsersModel.create(payload);
    if(!newUser) throw new AppError(httpStatus.BAD_REQUEST, 'User is not created');
    return newUser;
   } catch (error) {
    next(error);
   }
}


export const UsersServices = {
    createUserIntoDB
}