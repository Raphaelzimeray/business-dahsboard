import crypto from "crypto";

type SessionPayload = {
  sub: string;        // user identifier (ex: email)
  role: "admin";
  exp: number;        // unix seconds
};

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

export function signSession(payload: Omit<SessionPayload, "exp">, ttlSeconds = 60 * 60 * 8) {
  const full: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };

  const body = Buffer.from(JSON.stringify(full)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");

  // compare "safe"
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;

  if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}
