import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Route guard: anything under /dashboard requires a valid session token.
// Unauthenticated hits get bounced to /login with a `from` param so the
// login page could redirect back after a successful sign-in (not wired up
// yet in this walking skeleton, but the hook is there).
export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
