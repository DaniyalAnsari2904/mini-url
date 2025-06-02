import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // needed for Render PostgreSQL
  },
});

pool.connect()
  .then(() => console.log('🟢 PostgreSQL connected successfully'))
  .catch(err => console.error('🔴 PostgreSQL connection failed', err));

export default pool;
