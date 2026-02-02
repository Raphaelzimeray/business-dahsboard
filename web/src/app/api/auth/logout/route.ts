import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE = "bizdash_session";

function clearAndRedirect(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.set(AUTH_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function POST(req: NextRequest) {
  return clearAndRedirect(req);
}

// pratique pour un simple <a href="/api/auth/logout">
export async function GET(req: NextRequest) {
  return clearAndRedirect(req);
}
