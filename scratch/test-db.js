const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log("Connecting to DB...");
    const usersCount = await prisma.user.count();
    console.log("Connected! Total Users in DB:", usersCount);
    
    const appsCount = await prisma.fundingApplication.count();
    console.log("Total Funding Applications in DB:", appsCount);
  } catch (err) {
    console.error("DB Diagnostic Error:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}
main();
