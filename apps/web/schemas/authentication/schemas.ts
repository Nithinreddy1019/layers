import { z } from "zod";



export const SignInSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimun 6 characters are required"
    })
});


export const SignUpSchema = z.object({
    username: z.string().min(1, {
        message: "username required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimun 6 characters are required"
    })
});