"use server"

import { NewPasswordSchema } from "@repo/schemas/user-schema";
import * as z from "zod";
import { getUserByEmail } from "~/data/users";
import { getPasswordresetByToken } from "~/data/verification-tokens";
import * as bcrypt from "bcryptjs";
import { db } from "@repo/db/db";

export const NewPasswordAction = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
) => {
    if(!token) {
        return { error: "Missing token" }
    };

    const existingToken = await getPasswordresetByToken(token);
    if(!existingToken) {
        return { error: "Invalid token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired) {
        return { error: "Token has expired" }
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if(!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { newPassword , confirmNewPassword } = validatedFields.data;
    if(newPassword !== confirmNewPassword) {
        return { error: "Passwords do not match" }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser) {
        return { error: "Email does not exist" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        await db.user.update({
            where: { email: existingUser.email },
            data: {
                password: hashedPassword
            }
        });

        await db.passwordResetToken.delete({
            where: {
                token: token
            }
        });

        return { success: "Password successfully reset" }
    } catch (error) {
        return { error: "Something went wrong" }
    }
};