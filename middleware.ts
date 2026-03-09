import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const token =
    request.cookies.get("sb-access-token") ||
    request.cookies.get("sb-auth-token");

  const response = NextResponse.next();

  // pass auth state to the page
  if (token) {
    response.headers.set("x-user-authenticated", "true");
  } else {
    response.headers.set("x-user-authenticated", "false");
  }

  return response;
}

export const config = {
  matcher: ["/"], // run middleware only on home page
};