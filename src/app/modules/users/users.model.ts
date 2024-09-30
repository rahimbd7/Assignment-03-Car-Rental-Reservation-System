/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import IUser, { UserModel } from "./users.interface";
import bcrypt from 'bcrypt';
import config from "../../../config";
const UserSchema = new Schema<IUser,UserModel>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address:{
      type:String,
      required:true
    }
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: {
      virtuals: false, // Disable virtual id field
      transform: function (doc, ret) {
        delete ret.__v;     // Remove __v from the response
        delete ret.password; // Optionally remove password
        return ret;
      }
    },
    toObject: {
      virtuals: false, // Disable virtual id field
      transform: function (doc, ret) {
        delete ret.__v;     // Remove __v from the response
        delete ret.password; // Optionally remove password
        return ret;
      }
    }
  });

  UserSchema.pre('save',async function(next){
    const user = this;
    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_round))
    next();
  })
  
UserSchema.statics.isUserExists =async function (email:string) {
    return await UsersModel.findOne({email});
}

UserSchema.statics.isPasswordMatched = async function(plainTextPassword,hashedPassword){
  return await bcrypt.compare(plainTextPassword,hashedPassword);
}


export const UsersModel = model<IUser,UserModel>('users', UserSchema)