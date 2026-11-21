import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Private routes: dashboard, equipment details and payment pages.
// The session cookie persists, so reloading a private page never logs the user out.
export function middleware(request) {
  if (!getSessionCookie(request)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/equipment/:id", "/payment/:path*"] };
