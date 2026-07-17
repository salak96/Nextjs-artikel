import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // OAuth callback is not needed with JWT-based auth.
  // Redirect users to the home page.
  return NextResponse.redirect(new URL("/", request.url));
}