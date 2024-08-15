"use server"
import { auth } from "~/auth";


type signedUrlResponse = Promise<
    {error?: undefined; success: { url: string }} | 
    { error: string; success?: undefined}
>


export const getSignedUrl = async (): signedUrlResponse => {
    const session = await auth();

    if(!session) {
        return { error: "Not authenticated" }
    };

    return { success: { url: "asdasdasasd"}}
}