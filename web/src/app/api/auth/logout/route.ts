import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

function logoutResponse(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  // supprimer le cookie
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function GET(req: Request) {
  return logoutResponse(req);
}

export async function POST(req: Request) {
  return logoutResponse(req);
}

