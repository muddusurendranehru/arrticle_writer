// Simple test to check if backend basics work
require('dotenv').config();

console.log('🔍 Testing Backend Setup...\n');

// Check Node version
console.log('✓ Node version:', process.version);

// Check environment variables
console.log('✓ DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('✓ JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('✓ PORT:', process.env.PORT || '5000');

// Test database connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('\n❌ Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✓ Database connected:', res.rows[0].now);
    console.log('\n✅ All checks passed! Backend should work.');
    process.exit(0);
  }
});

