import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character required"
    }),
    code: z.string().optional()
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


export const ResetSchema = z.object({
    email: z.string({
        message: "Email is required"
    }).email({
        message: "Emails is required"
    })
});


export const NewPasswordSchema = z.object({
    newPassword: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    confirmNewPassword: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
});