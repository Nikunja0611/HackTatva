const { sql } = require('../../config/sql');
const User = require('./User');
const Event = require('./Event');
const Score = require('./Score');

// Initialize models
User.initModel(sql);
Event.initModel(sql);
Score.initModel(sql);

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

// Sync function for Azure SQL Server
async function syncModels() {
  try {
    console.log('🔄 Syncing SQL models...');
    
    // For Azure SQL, we'll use force sync to create tables properly
    // This will drop and recreate tables if they exist
    await sql.sync({ force: true });
    console.log('✅ SQL models synced successfully');
    
  } catch (error) {
    console.error('❌ SQL sync error:', error.message);
    throw error;
  }
}

module.exports = { 
  sql, 
  User, 
  Event, 
  Score, 
  sync: syncModels 
};
