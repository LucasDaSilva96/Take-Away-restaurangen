import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_SECRET } from "./constants/localStorageKeys";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Comprehensive list of public paths
  const isPublicPath =
    path === "/" ||
    path.startsWith("/auth") ||
    path.startsWith("/about") ||
    path.startsWith("/menu") ||
    path.startsWith("/contact") ||
    path.startsWith("/cart") ||
    path.startsWith("/checkout") ||
    path.startsWith("/login") ||
    path.startsWith("/signup");

  // Public paths can always be accessed
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Retrieve token from cookies
  const tokenCookie = request.cookies.get(JWT_SECRET);

  // Protected routes require authentication
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    // Add other routes that require authentication
  ];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute && !tokenCookie) {
    console.log("Unauthorized access attempt: No authentication token");
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // Continue with the request for authenticated routes or public paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
