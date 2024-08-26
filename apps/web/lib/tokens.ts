import { db } from "@repo/db/db";
import { v4 as uuidv4 } from "uuid";


export const generateVerificationtoken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExists = await db.verificationToken.findFirst({
        where: { email }
    });

    if(tokenExists) {
        await db.verificationToken.delete({
            where: { id: tokenExists.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token: token,
            expires: expires
        }
    })

    return verificationToken;
};



export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

    const tokenExists = await db.passwordResetToken.findFirst({
        where: {
            email: email
        }
    });

    if(tokenExists) {
        await db.passwordResetToken.delete({
            where: { id: tokenExists.id }
        })
    };

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email, 
            token: token,
            expires: expires
        }
    });

    return passwordResetToken;
}