import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../../config";
import { handleZodError } from "../errors/handleZodErrors";
import { TErrorSources } from "../common interfaces/errors";
import { handleValidationErrors } from "../errors/handleValidationErrors";
import { handleCastErrors } from "../errors/handleCastErrors";
import { handleDuplicateErrors } from "../errors/handleDuplicateErrors";
import AppError from "../errors/errors";



const globalErrorHandler: ErrorRequestHandler = ((err, req, res, next) => {
    //setting default values
    let statusCode =  500;
    let message =err?.message || 'Something wrong!';
    let errorSources: TErrorSources = [{
        path: "",
        message: "something went wrong"
    }]




    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationErrors(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastErrors(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    } else if (err?.name === 'BSONError') {
        statusCode = 400;
        message = err?.message
        errorSources = [{
            path: err?.path,
            message: err?.message
        }]
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateErrors(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    }else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message
            }
        ]
    }else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message
            }
        ]
    }

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        errorSources,
        stack: config.node_env === 'development' ? err?.stack : null
    })
    // next();
})



/**
 * success
 * message
 * errorSources:[
 *    path:"",
 *    message:""
 * ]
 * stack:""
 * 
 */
export default globalErrorHandler;