/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./users.constants";

interface IUser{
_id?:string,
name:string,
email:string,
role:'user'|'admin',
password:string,
phone:string,
address:string
}

export interface UserModel extends Model<IUser>{
    isUserExists(email:string):Promise<IUser>;
    isPasswordMatched(plainTextPassword:string,hashedPassword:string):Promise<boolean>;
    isJWTIssuedBeforePasswordChange(passwordChangeTimeStamp:Date,JwtIssuedTimeStamp:number):boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
export default IUser