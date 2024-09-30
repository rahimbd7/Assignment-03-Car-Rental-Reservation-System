import { NextFunction, Request, Response } from "express"
import catchAsync from "../utilis/catchAsync";
import AppError from "../errors/errors";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../modules/users/users.interface";
import { UsersModel } from "../modules/users/users.model";



const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.headers.authorization);
        const token = req.headers.authorization?.split(' ')[1];
        //check token has sent from client or not
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
        }
        //verify the token
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        // console.log(decoded); 
        const {role,userEmail} = decoded;
        
            //is the user is exists?
    const user = await UsersModel.isUserExists(userEmail);
    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User is not found');
    }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
        }
        req.user = decoded as JwtPayload;
        next();
    })
}
export default auth;