"use server"

import { db } from "@repo/db/db";
import { RegisterSchema } from "@repo/schemas/user-schema";
import * as z from "zod";
import * as bcrypt from "bcryptjs";
import { sendVerificationEmail } from "~/lib/emails";
import { generateVerificationtoken } from "~/lib/tokens";



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

        
        //WIP: Email verification

        const verificationToken = await generateVerificationtoken(user.email);
        const sendMail = await sendVerificationEmail({
            mailId: user.email,
            token: verificationToken.token
        })

        return { success: "Verification email sent successfully." }
    } catch (error) {
        return { error: "something went wrong" }
    }

}