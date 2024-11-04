# Car Rental Reservation System

!['Cars'](https://i.ibb.co/hXdbQP3/hurancan.jpg
)

This API allows users to manage car rentals, providing endpoints for user registration, car management, booking, and returning vehicles.

---

## API Endpoints

### Authentication

- **POST** `/api/auth/signup`
  - Registers a new user.
  - **Body Parameters**:
    - `name`: User's name (string)
    - `email`: User's email (string, unique)
    - `password`: User's password (string)
    - `role`: User role, either `user` or `admin` (string)

- **POST** `/api/auth/signin`
  - Authenticates a user and returns a JWT token.
  - **Body Parameters**:
    - `email`: User's email (string)
    - `password`: User's password (string)

### Car Management (Admin Only)

- **POST** `/api/cars`
  - Creates a new car record.
  - **Body Parameters**:
    - `model`: Car model (string)
    - `pricePerHour`: Rental price per hour (number)
    - `status`: Car availability status, defaults to `available` (string)

- **GET** `/api/cars`
  - Retrieves a list of all cars.

- **GET** `/api/cars/:id`
  - Retrieves details of a specific car.
  - **URL Parameters**:
    - `id`: Car ID (string)

- **PUT** `/api/cars/:id`
  - Updates details of a car.
  - **URL Parameters**:
    - `id`: Car ID (string)
  - **Body Parameters**:
    - `model` (optional): Car model (string)
    - `pricePerHour` (optional): Price per hour (number)
    - `status` (optional): Car status (string)

- **DELETE** `/api/cars/:id`
  - Deletes a car record.
  - **URL Parameters**:
    - `id`: Car ID (string)

### Booking

- **POST** `/api/bookings`
  - Books a car for a user.
  - **Body Parameters**:
    - `carId`: ID of the car to book (string)
    - `startTime`: Start time of booking (ISO date string)
    - `endTime`: End time of booking (ISO date string)

- **GET** `/api/bookings`
  - Retrieves all bookings (Admin Only).

- **GET** `/api/bookings/my-bookings`
  - Retrieves bookings of the authenticated user.

### Car Return (Admin Only)

- **PUT** `/api/cars/return`
  - Marks a car as returned, updates booking status, and calculates total cost.
  - **Body Parameters**:
    - `bookingId`: ID of the booking to be returned (string)

---

### Notes

- **Authorization**: JWT token is required for most routes, included as `Bearer <token>` in the `Authorization` header.
- **Admin Access**: Routes involving car management and viewing all bookings are accessible only to admin users.

