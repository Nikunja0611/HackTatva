const path = require('path');

// Explicitly load .env from current directory
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('🔍 Checking environment variables...');
console.log('Current directory:', __dirname);
console.log('Looking for .env at:', path.join(__dirname, '.env'));

// Check if .env variables are loaded
const envVars = {
  SQL_SERVER: process.env.SQL_SERVER,
  SQL_DB: process.env.SQL_DB,
  SQL_USER: process.env.SQL_USER,
  SQL_PASSWORD: process.env.SQL_PASSWORD ? '***FOUND***' : 'MISSING',
  SQL_ENCRYPT: process.env.SQL_ENCRYPT
};

console.log('Environment variables:', envVars);

if (!process.env.SQL_SERVER) {
  console.error('❌ ERROR: .env file not loaded or SQL_SERVER missing!');
  console.error('Make sure .env file exists in:', __dirname);
  process.exit(1);
}

const { sql, testConnection } = require('./config/sql');

async function test() {
  console.log('\n🔄 Testing database connection...');
  
  try {
    await testConnection();
    console.log('✅ SUCCESS: Database connection working!');
    console.log('🎉 Ready to build your app!');
  } catch (error) {
    console.log('❌ FAILED: Database connection failed');
    console.log('Error type:', error.name);
    console.log('Error message:', error.message);
    
    // Common error solutions
    if (error.message.includes('Login failed')) {
      console.log('\n💡 SOLUTION: Check your username/password in .env file');
    } else if (error.message.includes('Cannot connect')) {
      console.log('\n💡 SOLUTION: Check firewall rules in Azure - add your IP address');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 SOLUTION: Check your server name and network connection');
    }
  } finally {
    try {
      await sql.close();
      console.log('🔒 Connection closed');
    } catch (closeError) {
      console.log('Note: Connection was already closed');
    }
  }
}

test();