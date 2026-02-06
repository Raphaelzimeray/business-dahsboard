import { NextResponse } from "next/server";
import { COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";
import { signSession } from "@/lib/session";

function safeNext(next: string) {
  // évite les redirects externes (sécurité basique)
  if (!next.startsWith("/")) return "/dashboard";
  return next;
}

export async function POST(req: Request) {
  const form = await req.formData();

  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  const nextRaw = String(form.get("next") ?? "/dashboard");
  const next = safeNext(nextRaw);

  if (!email || !password) {
    return NextResponse.redirect(new URL(`/login?error=missing&next=${encodeURIComponent(next)}`, req.url));
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  const ok = email === adminEmail && password === adminPassword;

  if (!ok) {
    return NextResponse.redirect(new URL(`/login?error=invalid&next=${encodeURIComponent(next)}`, req.url));
  }

  const token = await signSession({ sub: email, role: "admin" });

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    ...COOKIE_OPTIONS,
  });

  return res;
}
