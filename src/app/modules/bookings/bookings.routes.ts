import express from 'express';
import auth from './../../middlewares/auth';
import { USER_ROLE } from '../users/users.constants';

const bookingsRouter  = express.Router();


bookingsRouter.get('/',auth(USER_ROLE.user),async(req,res)=>{
    console.log(req.user);
    res.send('hello');
})

export default bookingsRouter;