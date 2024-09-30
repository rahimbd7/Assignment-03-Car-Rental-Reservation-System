import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/users.constants';
import validateRequest from '../../middlewares/validateRequest';
import { carsValidation } from './cars.validation';
import { carsControllers } from './cars.controllers';
const carsRouter = express.Router();

carsRouter.post('/',auth(USER_ROLE.admin),validateRequest(carsValidation.createCarValidation),carsControllers.createACar);

carsRouter.get('/',carsControllers.getAllCars);

carsRouter.get('/:id',carsControllers.getACars);

carsRouter.put('/:id',auth(USER_ROLE.admin),carsControllers.updateACar);

carsRouter.delete('/:id',auth(USER_ROLE.admin),carsControllers.deleteACar);



export default carsRouter;