import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next internals + static files (always)
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  // Read our auth cookie once (used in multiple checks)
  const token = req.cookies.get("access_token")?.value;

  // ✅ If already signed in, keep them out of auth pages
  if (pathname === "/login" && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow public paths (like /login) for non-auth users
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Not signed in → redirect to /login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Signed in → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api).*)"],
};
