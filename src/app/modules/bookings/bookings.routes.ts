import express from 'express';
import auth from './../../middlewares/auth';
import { USER_ROLE } from '../users/users.constants';
import { bookingsControllers } from './bookings.controller';
import { BookingsValidationSchemas } from './bookings.validation';
import validateRequest from '../../middlewares/validateRequest';

const bookingsRouter  = express.Router();


bookingsRouter.post('/',auth(USER_ROLE.user),validateRequest(BookingsValidationSchemas.AddBookingSchema),bookingsControllers.bookACar);

bookingsRouter.get('/',auth(USER_ROLE.admin),bookingsControllers.getAllBookings);

bookingsRouter.get('/my-bookings',auth(USER_ROLE.user),bookingsControllers.getUserAllBookings);


export default bookingsRouter;