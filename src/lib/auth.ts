import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { first, run } from "./db";

// Admin accounts stored in D1.
// Passwords: PBKDF2-SHA256, 100k iterations (the maximum Cloudflare Workers allows), random 16-byte salt.
// Sessions: random 32-byte token in an httpOnly cookie; only its SHA-256 hash is stored in the database.

export const SESSION_COOKIE = "mw_admin_session";
const SESSION_DAYS = 7;
const ITERATIONS = 100_000;

const enc = new TextEncoder();
const toHex = (b: ArrayBuffer | Uint8Array) =>
  Array.from(b instanceof Uint8Array ? b : new Uint8Array(b), (x) => x.toString(16).padStart(2, "0")).join("");
const fromHex = (h: string) => new Uint8Array((h.match(/.{2}/g) ?? []).map((x) => parseInt(x, 16)));

async function pbkdf2(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations }, key, 256);
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return ["pbkdf2", ITERATIONS, toHex(salt), toHex(await pbkdf2(password, salt, ITERATIONS))].join(":");
}

export async function verifyPassword(password: string, stored: string) {
  const [, iter, salt, hash] = stored.split(":");
  if (!iter || !salt || !hash) return false;
  const actual = new Uint8Array(await pbkdf2(password, fromHex(salt), Number(iter)));
  const expected = fromHex(hash);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

/** Constant-time string comparison (used for the bootstrap credentials). */
export function safeEqual(a: string, b: string) {
  const x = enc.encode(a), y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

async function sha256(s: string) {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
}

export async function createSession(adminId: string) {
  const token = toHex(crypto.getRandomValues(new Uint8Array(32)));
  const expires = new Date(Date.now() + SESSION_DAYS * 86400_000);
  await run(
    "INSERT INTO admin_sessions (token_hash, admin_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
    await sha256(token), adminId, expires.toISOString(), new Date().toISOString(),
  );
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await run("DELETE FROM admin_sessions WHERE token_hash = ?", await sha256(token)).catch(() => {});
  store.delete(SESSION_COOKIE);
}

export type Admin = { id: string; email: string; name: string };

/** Returns the signed-in admin, or null. */
export const getAdmin = cache(async (): Promise<Admin | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return first<Admin>(
    `SELECT a.id, a.email, a.name FROM admin_sessions s JOIN admin_users a ON a.id = s.admin_id
     WHERE s.token_hash = ? AND s.expires_at > ?`,
    await sha256(token), new Date().toISOString(),
  );
});

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
