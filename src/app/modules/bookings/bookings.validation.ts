import { z } from 'zod';

// Time format validation for 24-hour format (HH:MM)
const time24HourFormat = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Expected HH:MM in 24-hour format")

const AddBookingSchema = z.object({
  body: z.object({
    date: z.string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }) // Validate date format
    .transform(val => new Date(val)), // Convert string to Date object,
    userId: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    }).min(1, "User ID cannot be empty").optional(),  // user reference
    carId: z.string({
      required_error: 'Car ID is required',
      invalid_type_error: 'Car ID must be a string',
    }).min(1, "Car ID cannot be empty"),    // car reference
    startTime: time24HourFormat,
    endTime: time24HourFormat.optional(),
    totalCost: z.number().nonnegative().default(0),    // Default value 0, non-negative number
  })
});


export const BookingsValidationSchemas={
  AddBookingSchema
}
