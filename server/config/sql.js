const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("🔎 Environment check:");
console.log("SQL_SERVER:", process.env.SQL_SERVER || "❌ Missing");
console.log("SQL_DB:", process.env.SQL_DB || "❌ Missing");
console.log("SQL_USER:", process.env.SQL_USER || "❌ Missing");
// Don't log SQL_PASSWORD for security

// ✅ Guard clause for missing env vars
if (!process.env.SQL_SERVER || !process.env.SQL_DB || !process.env.SQL_USER || !process.env.SQL_PASSWORD) {
  throw new Error("❌ Missing SQL environment variables. Check your .env file in /server");
}

// ✅ Initialize Sequelize
const sql = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_SERVER,
    port: 1433,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: process.env.SQL_ENCRYPT === "true", // controlled by .env
        trustServerCertificate: false,
        enableArithAbort: true,
        connectionTimeout: 60000,
        requestTimeout: 60000,
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    logging: false, // Set to console.log if you want SQL queries
  }
);

// ✅ Test connection utility
async function testConnection() {
  try {
    console.log(`⚡ Attempting SQL connection → ${process.env.SQL_SERVER}/${process.env.SQL_DB}`);
    await sql.authenticate();
    console.log("✅ Azure SQL connection successful!");
    return true;
  } catch (error) {
    console.error("❌ SQL connection failed:", error.message);
    throw error;
  }
}

module.exports = { sql, testConnection };
