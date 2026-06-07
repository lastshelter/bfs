const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
const crypto = require('crypto');
require('dotenv').config();

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function getMasterKey() {
  const keyHex = process.env.APP_MASTER_ENCRYPTION_SECRET;
  if (!keyHex) throw new Error("APP_MASTER_ENCRYPTION_SECRET not defined.");
  return Buffer.from(keyHex, "hex");
}

function encryptField(text) {
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

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const testPayload = {
    firstName: "Test",
    lastName: "User",
    email: "test-" + Date.now() + "@example.com",
    phone: "123-456-7890",
    legalName: "Test Company llc",
    ein: "12-3456789",
    revenueAnnual: 250000,
    requestedAmount: 75000,
    timeInBusiness: "1-3 Years",
    useOfFunds: "Working Capital",
    creditScoreTier: "Good (650-719)",
  };

  try {
    console.log("Simulating submission for email:", testPayload.email);
    
    // Encrypt fields
    const encryptedEin = encryptField(testPayload.ein);
    const einEncryptedString = `${encryptedEin.iv}:${encryptedEin.encryptedData}:${encryptedEin.tag}`;

    const metadataJson = JSON.stringify({
      userAgent: "node-test",
      ip: "127.0.0.1",
      timestamp: new Date().toISOString(),
    });
    const encryptedMetadata = encryptField(metadataJson);
    const encryptedMetadataString = `${encryptedMetadata.iv}:${encryptedMetadata.encryptedData}:${encryptedMetadata.tag}`;

    const initialLogsJson = JSON.stringify([
      {
        timestamp: new Date().toISOString(),
        status: "SUBMITTED",
        event: "Test submission",
        actor: "SYSTEM",
      },
    ]);
    const encryptedLogs = encryptField(initialLogsJson);
    const encryptedLogsString = `${encryptedLogs.iv}:${encryptedLogs.encryptedData}:${encryptedLogs.tag}`;

    const sanitizeCompanyName = (name) => {
      return name.replace(/\b(llc|inc|llp|corp)\b/gi, (match) => match.toUpperCase());
    };
    const sanitizedLegalName = sanitizeCompanyName(testPayload.legalName);

    console.log("Starting Prisma transaction...");
    const result = await prisma.$transaction(async (tx) => {
      // 1. Locate or create User
      let user = await tx.user.findUnique({
        where: { email: testPayload.email },
      });
      if (!user) {
        user = await tx.user.create({
          data: {
            email: testPayload.email,
            passwordHash: "placeholder",
            firstName: testPayload.firstName,
            lastName: testPayload.lastName,
            role: "CLIENT",
          },
        });
      }

      // 2. Locate or create Company
      let company = await tx.company.findUnique({
        where: { userId: user.id },
      });
      if (!company) {
        company = await tx.company.create({
          data: {
            userId: user.id,
            legalName: sanitizedLegalName,
            einEncrypted: einEncryptedString,
            revenueAnnual: testPayload.revenueAnnual,
            phone: testPayload.phone,
          },
        });
      }

      // 3. Create FundingApplication
      const application = await tx.fundingApplication.create({
        data: {
          companyId: company.id,
          requestedAmount: testPayload.requestedAmount,
          status: "SUBMITTED",
          notes: "Simulation",
          encryptedMetadata: encryptedMetadataString,
          encryptedLogs: encryptedLogsString,
          timeInBusiness: testPayload.timeInBusiness,
          useOfFunds: testPayload.useOfFunds,
          creditScoreTier: testPayload.creditScoreTier,
        },
      });

      return { user, company, application };
    });

    console.log("Transaction Succeeded! Application ID:", result.application.id);
  } catch (error) {
    console.error("TRANSACTION FAILED:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
