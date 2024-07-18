"use server"
import { db } from "@repo/db/db";
import { LoginSchema } from "@repo/schemas/user-schema";
import { AuthError } from "next-auth";
import * as z from "zod";
import { signIn } from "~/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const LoginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFileds = LoginSchema.safeParse(values);

    if(!validatedFileds.success) {
        return { error: "Invalid credentials" }
    }

    const { email, password } = validatedFileds.data;

    const existingUser = await db.user.findUnique({
        where: { email }
    });
    if(!existingUser) {
        return { error: "Email not found" }
    }

    //WIP: Email verification

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            console.log(error.type)
            switch(error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong" }
            }
        }

        throw error;
    }

    return { success: "Login successful" }
}