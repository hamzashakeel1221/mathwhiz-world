import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "mw_admin_session";

// Fast gate: no session cookie → login page. Every admin page and action also
// validates the session against the database (see src/lib/auth.ts).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !req.cookies.get(SESSION_COOKIE)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/admin/:path*"] };
