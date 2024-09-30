import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../common interfaces/errors";

export const handleZodError = (err: ZodError):TGenericErrorResponse => {
    const statusCode = 400;
    const errorSources:TErrorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })
    return {
        statusCode,
        message: "Validation Error",
        errorSources,
       
    }
}