// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import {
//   authenticationApiRoutes,
//   authenticationRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   publicRoutes,
// } from "./routes";

// export const { auth } = NextAuth(authConfig);

// export default auth((req) => {

//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

  

//   const isAuthenticationApiRoute = nextUrl.pathname.startsWith(
//     authenticationApiRoutes
//   );
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthenticationRoute = authenticationRoutes.includes(nextUrl.pathname);

//   if (isAuthenticationApiRoute) {
//     return;
//   }

//   if (isAuthenticationRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }

//     return undefined;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/signin", nextUrl));
//   }

//   return undefined;
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  authenticationApiRoutes,
  authenticationRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const secret = process.env.AUTH_SECRET;

export async function middleware(req:any) {
  const { nextUrl } = req;
  
  // Get token without database lookups (JWT verification only)
  const token = await getToken({ req, secret });
  const isLoggedIn = !!token;
  
  const isAuthenticationApiRoute = nextUrl.pathname.startsWith(authenticationApiRoutes);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthenticationRoute = authenticationRoutes.includes(nextUrl.pathname);
  
  if (isAuthenticationApiRoute) {
    return NextResponse.next();
  }
  
  if (isAuthenticationRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }
  
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};