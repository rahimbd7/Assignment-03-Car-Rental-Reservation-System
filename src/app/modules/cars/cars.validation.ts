// car.validation.ts
import { z } from 'zod';

 const createCarValidation = z.object({
   body:z.object({
      name: z.string().min(1, { message: 'Name is required' }).trim(),
      description: z.string().min(1, { message: 'Description is required' }).trim(),
      color: z.string().min(1, { message: 'Color is required' }).trim(),
      isElectric: z.boolean().optional().default(false),
      status: z.enum(['available', 'unavailable']).default('available'),
      features: z.array(z.string()).optional().default([]),
      pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }),
      isDeleted: z.boolean().optional().default(false),
  })
 });


 const carUpdateValidation = createCarValidation.partial();

 export const carsValidation = {
    createCarValidation,
    carUpdateValidation
 }
