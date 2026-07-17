import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/profile", "/settings", "/bookmarks", "/paneladmin"];
  const isProtected = protectedRoutes.some(route => path.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/settings/:path*", "/bookmarks/:path*", "/paneladmin/:path*"],
};
