import httpStatus from 'http-status'
import catchAsync from '../../utilis/catchAsync'
import sendResponse from '../../utilis/send.response'
import { carsServices } from './cars.services'

const createACar = catchAsync(async (req, res, next) => {
  const data = req.body
  // console.log(data);
  const result = await carsServices.createCarsIntoDB(data, next)
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Car created successfully',
      data: result,
    })
  } else {
    throw new Error()
  }
})

const getAllCars = catchAsync(async (req, res, next) => {
  const result = await carsServices.getAllCarsFromDB(next)
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    })
  } else {
    throw new Error()
  }
})

const getACars = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await carsServices.getACarFromDB(id, next)
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'A car retrieved successfully',
      data: result,
    })
  } else {
    throw new Error()
  }
})

const updateACar = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await carsServices.updateACarIntoDB(id, req.body, next)
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car updated successfully',
      data: result,
    })
  } else {
    throw new Error()
  }
})

const deleteACar = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await carsServices.deleteACarFromDB(id, next)
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car deleted successfully',
      data: result,
    })
  } else {
    throw new Error()
  }
})
export const carsControllers = {
  createACar,
  getAllCars,
  getACars,
  updateACar,
  deleteACar,
}
