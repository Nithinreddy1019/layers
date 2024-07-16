"use server"

import { db } from "@repo/db/db"


export const putData = async () => {
    await db.user.create({
        data: {
            name: "jkhygkh"
        }
    })
}