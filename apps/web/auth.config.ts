import type { NextAuthConfig } from "next-auth";
import * as bcrypt from "bcryptjs";
import { SignInSchema } from "./schemas/authentication/schemas";
import Credentials from "next-auth/providers/credentials";
import { db } from "@repo/db";

 
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        
        const validatedFields = SignInSchema.safeParse(credentials);

        if(validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({
            where: {
              email: email
            }
          });

          if(!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if(passwordMatch) return user;

        }
        
        return null;
      }
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user) {
        token.id = user.id as string
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session;
    }
  },
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
  pages: {
    signIn: "/signin"
  }
} satisfies NextAuthConfig