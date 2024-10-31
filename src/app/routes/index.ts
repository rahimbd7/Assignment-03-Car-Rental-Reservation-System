import { Router } from 'express'
import authRouter from '../modules/auth/auth.routes'
import globalErrorHandler from '../middlewares/globals.error.handler'
import notFound from '../middlewares/notFound'
import carsRouter from '../modules/cars/cars.router'
import bookingsRouter from '../modules/bookings/bookings.routes'
const Routes = Router()

const moduleRoutes = [
  {
    path: '/cars',
    route: carsRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/bookings',
    route: bookingsRouter,
  },
]

moduleRoutes.forEach((route) => {
  Routes.use(route.path, route.route)
})

Routes.use(globalErrorHandler)
Routes.use(notFound)

export default Routes
