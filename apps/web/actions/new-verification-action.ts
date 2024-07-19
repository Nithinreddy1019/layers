"use server"

import { db } from "@repo/db/db";
import { getUserByEmail } from "~/data/users";
import { getverificationTokenByToken } from "~/data/verification-tokens"



export const newVerificationAction = async (token: string) => {
    const tokenExists = await getverificationTokenByToken(token);

    if(!tokenExists) {
        return { error: "Token does not exist" }
    }

    const hasExpired = new Date(tokenExists.expires) < new Date();
    if(hasExpired) {
        return { error: "Token has expired" }
    }

    const userExists = await getUserByEmail(tokenExists.email);
    if(!userExists) {
        return { error: "Email does not exist" }
    }

    await db.user.update({
        where: { id: userExists.id },
        data: {
            emailVerified: new Date(),
            email: tokenExists.email
        }
    });

    await db.verificationToken.delete({
        where: { id: tokenExists.id }
    });


    return { success: "Email Verified"}
}