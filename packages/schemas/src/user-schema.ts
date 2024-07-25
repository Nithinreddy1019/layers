import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character required"
    })
});


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    username: z.string().min(1, {
        message: "Username is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character required"
    })
})


export const ProfileSchema = z.object({
    email: z.string().email(),
    username: z.string().optional(),
    password: z.string().optional(),
    image: z.string().optional(),
    credentials: z.boolean()
});