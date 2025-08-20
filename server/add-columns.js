require("dotenv").config();
const { sql } = require("./config/sql");

async function addColumns() {
  try {
    console.log("🔄 Adding new columns to Users table...");
    
    // Test connection
    await sql.authenticate();
    console.log("✅ Database connection successful");
    
    // List of new columns to add
    const newColumns = [
      { name: 'phone', type: 'NVARCHAR(20)', nullable: 'NULL' },
      { name: 'college', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'skills', type: 'NVARCHAR(MAX)', nullable: 'NULL' },
      { name: 'experience', type: 'NVARCHAR(50)', nullable: 'NULL' },
      { name: 'github', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'linkedin', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'portfolio', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'resumeUrl', type: 'NVARCHAR(500)', nullable: 'NULL' },
      { name: 'resumeFileName', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'googleId', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'githubId', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'avatar', type: 'NVARCHAR(500)', nullable: 'NULL' },
      { name: 'isEmailVerified', type: 'BIT', nullable: 'NOT NULL DEFAULT 0' },
      { name: 'emailVerificationToken', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'resetPasswordToken', type: 'NVARCHAR(255)', nullable: 'NULL' },
      { name: 'resetPasswordExpires', type: 'DATETIMEOFFSET', nullable: 'NULL' }
    ];
    
    // Check existing columns
    const existingColumns = await sql.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'Users'
    `);
    
    const existingColumnNames = existingColumns[0].map(col => col.COLUMN_NAME);
    
    // Add missing columns
    for (const column of newColumns) {
      if (!existingColumnNames.includes(column.name)) {
        console.log(`🔄 Adding column: ${column.name}`);
        
        try {
          await sql.query(`
            ALTER TABLE [Users] 
            ADD [${column.name}] ${column.type} ${column.nullable}
          `);
          console.log(`✅ Added column: ${column.name}`);
        } catch (error) {
          console.log(`⚠️ Failed to add column ${column.name}: ${error.message}`);
        }
      } else {
        console.log(`✅ Column already exists: ${column.name}`);
      }
    }
    
    // Show final table structure
    console.log("\n📋 Final Users table structure:");
    const finalColumns = await sql.query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'Users'
      ORDER BY ORDINAL_POSITION
    `);
    
    finalColumns[0].forEach(col => {
      console.log(`   - ${col.COLUMN_NAME} (${col.DATA_TYPE}, ${col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });
    
    console.log("\n🎉 Database update complete!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Database update failed:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
}

addColumns();
