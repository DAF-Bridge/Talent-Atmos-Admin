import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { formatExternalUrl } from "@/lib/utils";

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

// Specify protected and public routes
const protectedRoutes = [""];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Exclude specific file types directly in middleware
  if (/\.(png|jpg|jpeg|svg|gif|webp|ico)$/.test(path)) {
    return NextResponse.next(); // Skip middleware processing for these file types
  }

  // Run the intl middleware
  const res = intlMiddleware(req);
  if (res) {
    return res;
  }

  // Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.includes(path);

  // Get the token from the cookies or headers
  const token =
    cookies().get("authToken")?.value ??
    req.headers.get("Authorization")?.replace("Bearer ", "");

  // If the path is public, allow access
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // If the path is protected and no token exists, redirect to /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If token exists, validate it with Go backend
  if (token) {
    try {
      const apiUrl = formatExternalUrl("protected-route");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // If backend returns non-200 status, redirect to login
      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // If backend returns 200 status, allow access
      return NextResponse.next();
    } catch (error) {
      // Handle network errors or validation failures
      console.error("Token validation error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If token exists and path is not public, allow access
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image).*)", // Match all routes except API and Next.js static/image paths
    "/",
    "/(th|en)/:path*", // Match internationalized paths
  ],
};
