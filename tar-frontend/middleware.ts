import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_SECRET, ROLE_KEY } from "./constants/localStorageKeys";

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
  const roleCookie = request.cookies.get(ROLE_KEY);

  // Protected routes require authentication
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    // Add other routes that require authentication
  ];

  const customerRestrictedRoutes = [
    "/dashboard/inventory",
    "/dashboard/menu",
    "/dashboard/orders",
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

  // Check for role-based access to dashboard paths
  if (path.startsWith("/dashboard")) {
    // If no role is set, redirect to login
    if (!roleCookie) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }

    const userRole = roleCookie.value;

    // Block customer from accessing restricted dashboard paths
    if (
      userRole !== "Admin" &&
      customerRestrictedRoutes.some((restrictedPath) =>
        path.startsWith(restrictedPath)
      )
    ) {
      console.log(`Unauthorized access attempt: Customer blocked from ${path}`);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
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
