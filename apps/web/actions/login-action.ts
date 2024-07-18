"use server"
import { db } from "@repo/db/db";
import { LoginSchema } from "@repo/schemas/user-schema";
import * as z from "zod";

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

    return { success: "Login successful" }
}