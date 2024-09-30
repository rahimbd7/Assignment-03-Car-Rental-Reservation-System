import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../common interfaces/errors";
import httpStatus from "http-status";

export const handleCastErrors = (err:mongoose.Error.CastError ):TGenericErrorResponse => {
    const statusCode = httpStatus.NOT_FOUND;
    const errorSources:TErrorSources = [{path: err?.path, message: err?.value}];
    return {
        statusCode,
        message: `Invalid ${err.path}: ${err.value}`,
        errorSources
    }
}