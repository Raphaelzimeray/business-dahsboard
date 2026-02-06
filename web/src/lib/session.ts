export type SessionPayload = {
  sub: string; // identifiant (ex: email)
  role: "admin";
};

type SessionData = SessionPayload & {
  iat: number; // issued-at (timestamp secondes)
  exp: number; // expiration
};

const encoder = new TextEncoder();
const DEFAULT_TTL_SECONDS = 60 * 60 * 24; // 1 jour

function toBase64(bytes: Uint8Array): string {
  // Node (route handlers) => Buffer ok
  // Edge (middleware) => Buffer non, donc fallback btoa
  // @ts-expect-error Buffer may not exist in Edge
  if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");

  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function fromBase64(base64: string): Uint8Array {
  // @ts-expect-error Buffer may not exist in Edge
  if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(base64, "base64"));

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlEncode(bytes: Uint8Array): string {
  return toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(b64url: string): Uint8Array {
  const padded = b64url.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64url.length + 3) % 4);
  return fromBase64(padded);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

export async function signSession(payload: SessionPayload, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<string> {
  const secret = process.env.AUTH_SECRET ?? "";
  if (!secret) throw new Error("AUTH_SECRET is missing (check .env.local)");

  const now = Math.floor(Date.now() / 1000);
  const data: SessionData = { ...payload, iat: now, exp: now + ttlSeconds };

  const bodyJson = JSON.stringify(data);
  const body = base64UrlEncode(encoder.encode(bodyJson));

  const key = await getKey(secret);
  const sigBytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(body)));
  const sig = base64UrlEncode(sigBytes);

  return `${body}.${sig}`;
}

export async function verifySession(token: string): Promise<SessionData | null> {
  const secret = process.env.AUTH_SECRET ?? "";
  if (!secret) return null;

  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const key = await getKey(secret);
  const expectedSigBytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(body)));
  const givenSigBytes = base64UrlDecode(sig);

  if (!timingSafeEqual(expectedSigBytes, givenSigBytes)) return null;

  let data: SessionData;
  try {
    const json = new TextDecoder().decode(base64UrlDecode(body));
    data = JSON.parse(json) as SessionData;
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!data?.sub || data?.role !== "admin") return null;
  if (typeof data.exp !== "number" || data.exp < now) return null;

  return data;
}
