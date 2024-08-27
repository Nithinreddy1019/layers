"use server"
import { db } from "@repo/db/db";
import { LoginSchema } from "@repo/schemas/user-schema";
import { AuthError } from "next-auth";
import * as z from "zod";
import { signIn } from "~/auth";
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from "~/data/verification-tokens";
import { sendTwoFactorCodeMail, sendVerificationEmail } from "~/lib/emails";
import { generateTwoFactorrToken, generateVerificationtoken } from "~/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const LoginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFileds = LoginSchema.safeParse(values);

    if(!validatedFileds.success) {
        return { error: "Invalid credentials" }
    }

    const { email, password, code } = validatedFileds.data;

    const existingUser = await db.user.findUnique({
        where: { email }
    });
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email not found" }
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationtoken(existingUser.email);

        const sentEmail = await sendVerificationEmail({
            token: verificationToken.token,
            mailId: existingUser.email
        });

        return { success: "Verification email sent" }
    }

    //Sending two factor token 
    if(existingUser.isTwoFactorEnabled && existingUser.email) {

        if(code) {
            const twoFactortoken = await getTwoFactorTokenByEmail(existingUser.email);

            if(!twoFactortoken) {
                return { error: "Invalid code" }
            }

            if(twoFactortoken.token !== code) {
                return { error: "Invalid code"}
            }

            const hasExpired = new Date(twoFactortoken.expires) < new Date();
            if(hasExpired) {
                return { error: "Two Factor code has expired" }
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactortoken.id }
            });
            
            const existingConfirmation = await getTwoFactorConfirmationByUserId( existingUser.id );
            if(existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id } 
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });

        } else {
            const twoFactorToken = await generateTwoFactorrToken(existingUser.email);

            const sentMail = await sendTwoFactorCodeMail({
                token: twoFactorToken.token,
                mailId: existingUser.email
            })
    
            return { twoFactor: true }
        }

    };


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