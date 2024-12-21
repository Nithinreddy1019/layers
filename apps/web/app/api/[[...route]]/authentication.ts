import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";
import * as bcrypt from "bcryptjs";
import { db } from "@repo/db";
import { SignInSchema, SignUpSchema } from "../../../schemas/authentication/schemas";

const app = new Hono()
    .get("/hello", 
        async (c) => {
            return c.json({ msg: "Helo"})
        }
    )
    .post("/login", 
        zValidator("json", SignInSchema),
        async (c) => {

            const { email, password} = c.req.valid("json");

            const emailExists = await db.user.findUnique({
                where: { email }
            });
            if(!emailExists) {
                return c.json({ error: "Email does not exist"}, 411)
            };

            const passwordMatch = await bcrypt.compare(password, emailExists.password as string);
            if(!passwordMatch) {
                return c.json({ error: "Invalid credentials" }, 409)
            };

            return c.json({ success: "ok" })
        }
    )
    .post("/register",
        zValidator("json", SignUpSchema),
        async (c) => {

            const { username, email, password } = c.req.valid("json");
            if(!username || !email || !password) {
                return c.json({ error: "Missing credentials" }, 401)
            };

            const emailExists = await db.user.findUnique({
                where: { email }
            });
            if(emailExists) {
                return c.json({ error: "Email already in use"}, 409)
            };

            const passwordHash = await bcrypt.hash(password, 10);

            try {
                const user = await db.user.create({
                    data: {
                        name: username,
                        email,
                        password: passwordHash
                    }
                });

                return c.json({ success: "ok"}, 200);
            } catch (error) {
                return c.json({ error: "Something went wrong"}, 500)                
            }
        }
    )


export default app;