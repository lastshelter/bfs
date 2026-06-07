import "server-only";
import crypto from "crypto";

export type UserRole = "CLIENT" | "UNDERWRITER" | "ADMIN";

export interface SessionUser {
  readonly id: string;
  readonly email: string;
  readonly role: UserRole;
  readonly companyName?: string;
}

export interface SessionToken {
  readonly user: SessionUser;
  readonly expiresAt: number;
}

const JWT_HEADER = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");

function getJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET environment variable is missing or too short (must be at least 32 characters).");
  }
  return secret;
}

/**
 * Encodes a buffer or string to base64url format.
 */
function base64urlEncode(str: string): string {
  return Buffer.from(str).toString("base64url");
}

/**
 * Creates a signed JWT-like session token.
 */
export function createSessionToken(user: SessionUser, durationSeconds = 3600): string {
  const secret = getJwtSecret();
  const payload: SessionToken = {
    user,
    expiresAt: Math.floor(Date.now() / 1000) + durationSeconds,
  };

  const payloadEncoded = base64urlEncode(JSON.stringify(payload));
  const unsignedToken = `${JWT_HEADER}.${payloadEncoded}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
}

/**
 * Verifies a signed session token. Returns the payload user if valid, or null otherwise.
 */
export function verifySessionToken(token: string): SessionUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const headerEncoded = parts[0];
    const payloadEncoded = parts[1];
    const signature = parts[2];
    if (!headerEncoded || !payloadEncoded || !signature) {
      return null;
    }

    if (headerEncoded !== JWT_HEADER) {
      return null;
    }

    const secret = getJwtSecret();
    const unsignedToken = `${headerEncoded}.${payloadEncoded}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(unsignedToken)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    const payloadJson = Buffer.from(payloadEncoded, "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson) as SessionToken;

    if (payload.expiresAt < Math.floor(Date.now() / 1000)) {
      return null; // Expired session
    }

    return payload.user;
  } catch {
    return null;
  }
}
