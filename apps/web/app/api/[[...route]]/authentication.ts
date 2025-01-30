import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";
import * as bcrypt from "bcryptjs";
import { db } from "@repo/db";
import { ForgotPasswordSchema, ResetPasswordSchema, SignInSchema, SignUpSchema } from "../../../schemas/authentication/schemas";
import EmailServiceSingleton from "../../../features/mails/email-service";
import { generateVerificationToken } from "../../../features/mails/tokens";

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

            if(!emailExists.emailVerified) {
                const verificationToken = await generateVerificationToken(email);

                await EmailServiceSingleton.sendVerificationEmail({
                    username: emailExists.name as string,
                    verificationToken: verificationToken,
                    email: email
                });

                return c.json({ error: "Email not verified, verification email sent"}, 401)
            }

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

                const verificationToken = await generateVerificationToken(email);

                await EmailServiceSingleton.sendVerificationEmail({
                    username: username,
                    verificationToken: verificationToken,
                    email: email
                });

                return c.json({ success: "ok"}, 200);
            } catch (error) {
                return c.json({ error: "Something went wrong"}, 500)                
            }
        }
    )
    .post("/verify_email",
        zValidator("json", z.object({
            token: z.string()
        })),
        async (c) => {
            const { token } = c.req.valid("json");

            if(!token) {
                return c.json({ error: "Token not present" }, 400)
            };

            const existingToken = await db.verificationToken.findUnique({
                where: {
                    token
                }
            });
            if(!existingToken) {
                return c.json({ error: "Token does not exist" }, 400) 
            };

            const existingUser = await db.user.findUnique({
                where: {
                    email: existingToken.email
                }
            });
            if(!existingUser) {
                return c.json({ error: "User does not exist" }, 400)
            };

            const tokenHasExpired = new Date(existingToken.expires) < new Date();
            if(tokenHasExpired) {
                return c.json({ error: "Token has expired" }, 401)
            };

            await db.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    emailVerified: new Date(),
                    email: existingToken.email
                }
            });

            await db.verificationToken.delete({
                where: {
                    id: existingToken.id
                }
            });

            return c.json({ success: "Email verified successfully" }, 200)

        }
    )
    .post("/forgot_password",
        zValidator("json", ForgotPasswordSchema),
        async (c) => {

            const { email } = c.req.valid("json");

            const existingUser = await db.user.findUnique({
                where: {
                    email: email
                }
            });
            if(!existingUser) {
                return c.json({ error: "User does not exist" }, 400)
            };


            try {
                const verificationToken = await generateVerificationToken(email);

                await EmailServiceSingleton.sendPasswordResetEmail({
                    email: email,
                    username: existingUser.name as string,
                    expiryTime: "1 hour",
                    verificationToken: verificationToken
                });
                
                return c.json({ success: "Reset link sent to email"}, 200)
            } catch (error) {   
                return c.json({ error: "Something went wrong" }, 500);
            }

        }
    )
    .patch("/reset",
        zValidator("json", ResetPasswordSchema),
        zValidator("query", z.object({
            token: z.string()
        })),
        async (c) => {
            const { newPassword, confirmPassword } = c.req.valid("json");
            const { token } = c.req.valid("query");

            if(newPassword !== confirmPassword) {
                return c.json({ error: "Passwords do not match "}, 400)
            };

            if(!token) {
                return c.json({ error: "Token not present" }, 400)
            };

            const existingToken = await db.verificationToken.findUnique({
                where: {
                    token
                }
            });
            if(!existingToken) {
                return c.json({ error: "Token does not exist" }, 400) 
            };

            const existingUser = await db.user.findUnique({
                where: {
                    email: existingToken.email
                }
            });
            if(!existingUser) {
                return c.json({ error: "User does not exist" }, 400)
            };

            const tokenHasExpired = new Date(existingToken.expires) < new Date();
            if(tokenHasExpired) {
                return c.json({ error: "Token has expired" }, 401)
            };

            const password = await bcrypt.hash(newPassword , 10);

            try {

                if(!existingUser.emailVerified) {
                    await db.user.update({
                        where: {
                            id: existingUser.id
                        },
                        data: {
                            emailVerified: new Date(),
                            email: existingToken.email,
                            password: password
                        }
                    });
                } else {
                    await db.user.update({
                        where: {
                            id: existingUser.id
                        },
                        data: {
                            email: existingToken.email,
                            password: password
                        }
                    });
                }
    
                await db.verificationToken.delete({
                    where: {
                        id: existingToken.id
                    }
                });
            } catch (error) {
                return c.json({ error: "Something went wrong "}, 500)
            };

            return c.json({ success: "Password updated successfully "}, 200);
        }
    )


export default app;