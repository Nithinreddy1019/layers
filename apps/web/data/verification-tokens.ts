import { db } from "@repo/db/db"




export const getverificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { token }
        })

        return verificationToken
    } catch (error) {
        return null;        
    }
};



export const getVerificationtokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        });

        return verificationToken
    } catch (error) {
        return null;
    }
};


// Password reset tokens
export const getPasswordresetByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token: token }
        });

        return passwordResetToken
    } catch (error) {
        return null;
    }
};


export const getPasswordresetByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email: email }
        })

        return passwordResetToken
    } catch (error) {
        return null;
    }
};


//Two factor tokens
export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token: token }
        })

        return twoFactorToken
    } catch (error) {
        return null;
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email: email }
        })

        return twoFactorToken
    } catch (error) {
        return null;
    }
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorconfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId: userId }
        });

        return twoFactorconfirmation;
    } catch (error) {
        return null;
    }
}