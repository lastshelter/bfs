import "server-only";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits for GCM

interface EncryptedDataPayload {
  readonly iv: string;
  readonly encryptedData: string;
  readonly tag: string;
}

/**
 * Retrieves and validates the 32-byte (64 character hex) master encryption key from environment variables.
 */
function getMasterKey(): Buffer {
  const keyHex = process.env["APP_MASTER_ENCRYPTION_SECRET"];
  if (!keyHex) {
    throw new Error("APP_MASTER_ENCRYPTION_SECRET environment variable is not defined.");
  }
  
  if (keyHex.length !== 64) {
    throw new Error("APP_MASTER_ENCRYPTION_SECRET must be a 64-character hex string (32 bytes).");
  }

  return Buffer.from(keyHex, "hex");
}

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * @param text The plaintext string to encrypt.
 * @returns The iv, encryptedData, and auth tag as base64-encoded strings.
 */
export function encryptField(text: string): EncryptedDataPayload {
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    encryptedData: encrypted,
    tag: tag.toString("base64"),
  };
}

/**
 * Decrypts a base64-encoded AES-256-GCM payload.
 * @param iv The base64-encoded initialization vector.
 * @param encryptedData The base64-encoded ciphertext.
 * @param tag The base64-encoded authentication tag.
 * @returns The decrypted plaintext string.
 */
export function decryptField(iv: string, encryptedData: string, tag: string): string {
  const key = getMasterKey();
  const ivBuffer = Buffer.from(iv, "base64");
  const tagBuffer = Buffer.from(tag, "base64");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, ivBuffer);

  decipher.setAuthTag(tagBuffer);

  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
