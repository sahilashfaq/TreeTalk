import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtectedRoute =
    !isAuthPage &&
    pathname !== "/" &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/public");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
