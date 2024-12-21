import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@repo/db"
 

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})




// import authOptions from './/auth.config';
// import NextAuth, { type NextAuthResult } from 'next-auth';

// const result = NextAuth(authOptions);

// export const handlers: NextAuthResult['handlers'] = result.handlers;
// export const auth: NextAuthResult['auth'] = result.auth;
// export const signIn: NextAuthResult['signIn'] = result.signIn;
// export const signOut: NextAuthResult['signOut'] = result.signOut;