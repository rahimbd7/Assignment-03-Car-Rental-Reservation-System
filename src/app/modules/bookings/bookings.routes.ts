import express from 'express';
import auth from './../../middlewares/auth';
import { USER_ROLE } from '../users/users.constants';
import { bookingsControllers } from './bookings.controller';

const bookingsRouter  = express.Router();


bookingsRouter.get('/',auth(USER_ROLE.user),bookingsControllers.bookACar);


export default bookingsRouter;