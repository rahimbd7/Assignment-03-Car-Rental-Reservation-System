import { Request, Response } from "express";
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notFound =(( req:Request, res:Response) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:'API Not found',  
        error: ''
    })
})

export default notFound;