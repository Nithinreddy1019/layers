import { db } from "@repo/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    
    const body = await req.json();
    const email = body.email;

    if(!email) {
        return new Response("No email givev", {
            status: 411
        })
    }

    try {
        const user = await db.user.findUnique({
            where: { email }
        });

        if(!user) {
            return new Response("User not found", {
                status: 422
            })
        }

        return Response.json({
            id: user.id,
            username: user.name,
            email: user.email,
            image: user.image,
            credentials: user.password ? true : false
        }, { status: 200 });
    } catch (error) {
        return new Response("Internal server error", {
            status: 500
        });
    }

}