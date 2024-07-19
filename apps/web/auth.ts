import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@repo/db/db"
import { getUserById } from "./data/users"
 
const prisma = new PrismaClient()
 
declare module "next-auth" {
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  } 
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  events:{
    async linkAccount({user}) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async jwt({user, token}){
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      token.role = existingUser.role;

      return token
    },
    async session({ session, token}) {

      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.role && session.user) {
        session.user.role = token.role as string
      }

      return session
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})