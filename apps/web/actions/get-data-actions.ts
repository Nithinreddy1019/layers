"use server";

import { db } from "@repo/db/db";
import { auth } from "~/auth";


export const getTwoFactorData = async () => {
    const session = await auth();
    if(!session?.user) {
        return { error: "Unauthorized" }
    }

    try {
        const user = await db.user.findUnique({
            where: { id: session.user.id }
        });
        

        return {isTwoFactorEnabled: user?.isTwoFactorEnabled}
    } catch (error) {
        return { error: "Somethign went wrong" }
    };

}