import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({ message: 'Email is not valid' })
            .min(1, { message: 'Email is required' }),
        password: z.string({ required_error: 'must have to provide password' })
    })
})


export const AuthValidation = {
    loginValidationSchema,
}