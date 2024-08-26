import { db } from "@repo/db/db"


export const getUserByEmail = async (email: string) => {
    try {
        const existingUser = await db.user.findUnique({
            where: {email},
            include: {
                accounts: true
            }
        })

        return existingUser;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const existingUser = await db.user.findUnique({
            where: { id }
        });

        return existingUser;
    } catch (error) {
        return null;
    }
}