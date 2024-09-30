// user.validation.ts

import validator from 'validator';
import { z } from 'zod';


// Define the Zod schema for User
const createUserValidationSchema = z.object({
    body:z.object({
        name: z
          .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
          })
          .trim()
          .min(1, { message: 'Name cannot be empty' })
          .refine((value) => value.split(' ').length >= 2, {
            message: 'Name must include at least first name and last name',
          }),
      
        email: z
          .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
          })
          .trim()
          .email({ message: 'Invalid email address' }),
      
        role: z.enum(['user', 'admin'], {
          required_error: 'Role is required',
          invalid_type_error: 'Role must be either "user" or "admin"',
        }),
      
        password: z
          .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
          })
          .min(8, { message: 'Password must be at least 8 characters long' })
          .max(100, { message: 'Password cannot exceed 100 characters' })
          .refine(
            (value) =>
             
              /[a-z]/.test(value) && // At least one lowercase letter
              /[0-9]/.test(value) && // At least one digit
              
            {
              message:
                'Password must include at least  one lowercase letter, one number',
            }
          ),
      
        phone: z
          .string({
            required_error: 'Phone number is required',
            invalid_type_error: 'Phone number must be a string',
          })
          .trim()
          .min(10, { message: 'Phone number must be at least 10 digits' })
          .max(15, { message: 'Phone number cannot exceed 15 digits' })
          .refine((value) => validator.isNumeric(value), {
            message: 'Phone number must contain only digits',
          })
          .refine((value) => validator.isMobilePhone(value, 'any'), {
            message: 'Invalid phone number format',
          }),
      
        address: z
          .string({
            required_error: 'Address is required',
            invalid_type_error: 'Address must be a string',
          })
          .trim()
          .min(10, { message: 'Address must be at least 10 characters long' }),
      })
});
  


export const userValidationSchemas = {
    createUserValidationSchema
 
};
