require("dotenv").config();
const { sql } = require("./config/sql");

// Import models
const User = require("./models/sql/User");
const Event = require("./models/sql/Event");
const Score = require("./models/sql/Score");

// Initialize models WITHOUT associations first
User.initModel(sql);
Event.initModel(sql);
Score.initModel(sql);

async function initializeDatabase() {
  try {
    console.log("🚀 Initializing database...");
    
    // Test connection
    await sql.authenticate();
    console.log("✅ Database connection successful");
    
    // Drop existing tables if they exist (in reverse order due to foreign keys)
    console.log("🗑️ Dropping existing tables...");
    try {
      await Score.drop({ force: true });
      await Event.drop({ force: true });
      await User.drop({ force: true });
      console.log("✅ Existing tables dropped");
    } catch (dropError) {
      console.log("ℹ️ No existing tables to drop");
    }
    
    // Create tables WITHOUT foreign key constraints first
    console.log("🏗️ Creating tables...");
    
    console.log("📋 Creating Users table...");
    await User.sync({ force: true });
    
    console.log("📋 Creating Events table...");
    await Event.sync({ force: true });
    
    console.log("📋 Creating Scores table...");
    await Score.sync({ force: true });
    
    console.log("✅ All tables created successfully");
    
    // Now add associations after tables exist
    console.log("🔗 Adding table associations...");
    
    // Define associations
    User.hasMany(Event, { 
      foreignKey: 'createdBy',
      as: 'events'
    });
    Event.belongsTo(User, { 
      foreignKey: 'createdBy',
      as: 'creator'
    });

    User.hasMany(Score, {
      foreignKey: 'judgeId',
      as: 'judgedScores'
    });
    Score.belongsTo(User, {
      foreignKey: 'judgeId',
      as: 'judge'
    });

    Event.hasMany(Score, {
      foreignKey: 'eventId',
      as: 'scores'
    });
    Score.belongsTo(Event, {
      foreignKey: 'eventId',
      as: 'event'
    });
    
    console.log("✅ Associations added successfully");
    console.log("🎉 Database initialization complete!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Database initialization failed!");
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    
    if (error.parent) {
      console.error("Parent error:", error.parent.message);
      console.error("SQL:", error.parent.sql);
    }
    
    process.exit(1);
  }
}

initializeDatabase();
