import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Get token from cookies
  const { pathname } = req.nextUrl;

  // If user is already logged in, prevent access to /login or /register
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If user is NOT logged in, restrict access to protected routes
  if (!token && ["/home", "/cart", "/checkout"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/login", "/register", "/home", "/cart", "/checkout"],
};
