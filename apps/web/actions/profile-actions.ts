"use server"

import { db } from "@repo/db/db";
import * as z from "zod";
import { auth } from "~/auth";
import { getUserById } from "~/data/users";
import { sendVerificationEmail } from "~/lib/emails";
import { generateVerificationtoken } from "~/lib/tokens";
import * as bcrypt from "bcryptjs";


export const updateEmailAction = async (newEmail: string) => {

    const session = await auth();

    if(!session?.user) {
        return { error: "Unauthorized" }
    };
    
    const emailSchema = z.string().email();

    const validatedField = emailSchema.safeParse(newEmail);
    if(!validatedField.success) {
        return { error: "Not an email" }
    };

    const emailExists = await db.user.findUnique({
        where: { email: newEmail }
    });
    if(emailExists) {
        return { error: "Email already in use" }
    };


    try {
        const user = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                email: newEmail,
                emailVerified: null
            }
        });

        const verificationToken = await generateVerificationtoken(user.email);
        const sendMail = await sendVerificationEmail({
            mailId: user.email,
            token: verificationToken.token
        });

        return { success: "Verification email sent", email: newEmail }
    } catch (error) {
        return { error: "Something went wrong" }
    };

};


export const updateUsernameAction = async (newUsername: string) => {
    
    const session = await auth();

    if(!session?.user) {
        return { error: "Unauthorized" }
    };

    if(newUsername === "") {
        return { error: "Username cannot be empty"}
    }

    try {
        const user = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: newUsername
            }
        });

        return { success: "Username updated successfully", username: newUsername};
    } catch (error) {
        return { error: "Somethign went wrong" }
    }
};


export const updatePasswordAction = async (oldPassword: string, newPassword: string, newVerifyPassword: string) => {

    const session = await auth();
    if(!session?.user) {
        return { error: "Unauthorized" }
    }

    if((oldPassword === null || "") || (newPassword === null || "") ||  (newVerifyPassword === null || "")) {
        return { error: "Field Missing" }
    } else if(oldPassword.length < 6 || newPassword.length < 6 || newVerifyPassword.length < 6) {
        return { error: "Minumum 6 character required"}
    } else if(newPassword !== newVerifyPassword) {
        return { error: "New passwords do not match" }
    }

    const user = await getUserById(session.user.id!);

    const passwordsMatch = await bcrypt.compare(oldPassword, user?.password!);
    if(!passwordsMatch) {
        return { error: "Passwords do not match" }
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    try {
        await db.user.update({
            where: {
                id: user?.id
            },
            data: {
                password: passwordHash
            }
        });

        return { success: "Password updated successfully" }
    } catch (error) {
        return { error: "Somethign went wrong" }
    }

};


export const updateTwoFactorAuthentication = async (value: boolean) => {
    console.log(value);
    const session = await auth();
    if(!session?.user) {
        return { error: "Unauthorized" }
    }

    if(value === null) {
        return { error: "No value given" }
    };

    if(value === true) {
        await db.user.update({
            where: { id: session.user.id },
            data: { isTwoFactorEnabled: true }
        });

        return { success: "Two Factor Authentication enabled" }
    };

    if(value === false) {
        await db.user.update({
            where: { id: session.user.id },
            data: { isTwoFactorEnabled: false }
        });

        return { success: "Two Factor Authentication disabled" }
    };
}