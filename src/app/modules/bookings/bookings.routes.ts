import express from 'express';
import auth from './../../middlewares/auth';
import { USER_ROLE } from '../users/users.constants';
import { bookingsControllers } from './bookings.controller';
import { BookingsValidationSchemas } from './bookings.validation';
import validateRequest from '../../middlewares/validateRequest';

const bookingsRouter  = express.Router();


bookingsRouter.post('/',auth(USER_ROLE.user),validateRequest(BookingsValidationSchemas.AddBookingSchema),bookingsControllers.bookACar);


export default bookingsRouter;