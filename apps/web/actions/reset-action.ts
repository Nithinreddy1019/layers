"use server"

import { ResetSchema } from "@repo/schemas/user-schema";
import * as z from "zod";
import { getUserByEmail } from "~/data/users";
import { sendPasswordResetMail } from "~/lib/emails";
import { generatePasswordResetToken } from "~/lib/tokens";

export const ResetAction = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Email is required" }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        return { error: "User does not exist" }
    }

    if(!existingUser.password) {
        return { error: "Account created with another provider"}
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    //WIP: Send email
    const sentEmail = await sendPasswordResetMail({
        mailId: email,
        token: passwordResetToken.token
    });

    return { success: "Email sent for resetting password"}

}