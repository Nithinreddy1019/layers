import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { authenticationApiRoutes, authenticationRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLogeedIn = !!req.auth;

	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthenticationRoute = authenticationRoutes.includes(nextUrl.pathname);
	const isAuthenticationApiRoute = nextUrl.pathname.startsWith(authenticationApiRoutes);

	if (isAuthenticationApiRoute) return;

	if (isAuthenticationRoute) {
		if(isLogeedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (!isLogeedIn && !publicRoutes) {
		return Response.redirect(new URL("/auth/login", nextUrl));
	}

	return;
})

export const config = {
	matcher:  [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}