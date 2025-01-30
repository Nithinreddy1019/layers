"use server"

import { db } from "@repo/db";
import { v4 as uuidv4 } from "uuid";


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExists = await db.verificationToken.findUnique({
        where: {
            token
        }
    });

    if(tokenExists) {
        await db.verificationToken.delete({
            where: {
                id: tokenExists.id
            }
        });
    };

    const data = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    const verificationToken = data.token;
    return verificationToken;

};

