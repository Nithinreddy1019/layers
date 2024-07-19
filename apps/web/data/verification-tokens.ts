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
}