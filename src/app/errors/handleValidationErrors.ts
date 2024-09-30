import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../common interfaces/errors";

export const handleValidationErrors = (err:mongoose.Error.ValidationError):TGenericErrorResponse => {
    const errorSources:TErrorSources = Object.values(err.errors).map(
        (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: error?.path,
                message: error?.message
            }
        }
    )

    return  {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    }
}