require("dotenv").config();
const { sql } = require("./config/sql");
const { User } = require("./models/sql");

async function updateDatabase() {
  try {
    console.log("🔄 Updating database schema...");
    
    // Test connection
    await sql.authenticate();
    console.log("✅ Database connection successful");
    
    // Check if Users table exists and has the new fields
    try {
      const tableCheck = await sql.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'phone'
      `);
      
      const hasNewFields = tableCheck[0].length > 0;
      
      if (hasNewFields) {
        console.log("✅ Users table already has the new fields");
        console.log("📋 Current fields in Users table:");
        
        const allColumns = await sql.query(`
          SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'Users'
          ORDER BY ORDINAL_POSITION
        `);
        
        allColumns[0].forEach(col => {
          console.log(`   - ${col.COLUMN_NAME} (${col.DATA_TYPE}, ${col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'})`);
        });
        
      } else {
        console.log("🔄 Users table needs to be updated with new fields");
        console.log("⚠️ This will recreate the table. Any existing data will be lost!");
        console.log("💡 If you have important data, please backup first.");
        
        // Use force sync to recreate table with new structure
        console.log("🔄 Recreating Users table with new fields...");
        await User.sync({ force: true });
        console.log("✅ Users table recreated successfully");
      }
      
    } catch (error) {
      console.log("🔄 Users table doesn't exist, creating it...");
      await User.sync({ force: true });
      console.log("✅ Users table created successfully");
    }
    
    console.log("🎉 Database update complete!");
    console.log("📋 New fields available in Users table:");
    console.log("   - phone, college, skills, experience");
    console.log("   - github, linkedin, portfolio");
    console.log("   - resumeUrl, resumeFileName");
    console.log("   - googleId, githubId, avatar");
    console.log("   - isEmailVerified, emailVerificationToken");
    console.log("   - resetPasswordToken, resetPasswordExpires");
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Database update failed:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
}

updateDatabase();
