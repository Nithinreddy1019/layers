import { LoginSchema } from "@repo/schemas/user-schema";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/users";
import * as bcrypt from "bcryptjs";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
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