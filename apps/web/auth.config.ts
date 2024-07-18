import { LoginSchema } from "@repo/schemas/user-schema";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/users";
import * as bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Credentials({
        async authorize(credentials) {
            const validatedFileds = LoginSchema.safeParse(credentials);

            if(validatedFileds.success) {
                const { email, password } = validatedFileds.data;

                const user = await getUserByEmail(email);
                if(!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(password, user.password);

                if(passwordMatch) return user;
            }
            
            return null;
        }
    })
  ],
} satisfies NextAuthConfig