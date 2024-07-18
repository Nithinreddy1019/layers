"use server"

import { db } from "@repo/db/db";
import { RegisterSchema } from "@repo/schemas/user-schema";
import * as z from "zod";
import * as bcrypt from "bcryptjs";



export const RegisterAction = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFileds = RegisterSchema.safeParse(values);

    if(!validatedFileds.success) {
        return { error: "Invalid credentials" }
    }

    const { email, password, username } = validatedFileds.data;

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if(existingUser) {
        return { error: "Email already in use"}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await db.user.create({
            data: {
                email,
                name: username,
                password: hashedPassword
            }
        });

        return { success: "Registered successfully. Login now" }
    } catch (error) {
        return { error: "something went wrong" }
    }

}