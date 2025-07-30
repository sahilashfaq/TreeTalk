import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // ✅ If user is logged in and tries to access sign-in or sign-up, redirect to homepage
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtectedRoute =
    !isAuthPage &&
    pathname !== "/" &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/public");

  // ✅ If no token and trying to access a protected route, redirect to /sign-in
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all relevant routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
