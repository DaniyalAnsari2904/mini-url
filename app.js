import express from 'express';
import dotenv from "dotenv";
import userRoute from './route/user_route.js';
import rateLimit from 'express-rate-limit';
import path from 'path';
import pool from './config/pg_db.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});
app.use(express.json());
app.use(limiter);

const __dirname = path.resolve();
console.log(`Directory name: ${__dirname}`);
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', userRoute);

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ DB query error:', err);
  } else {
    console.log('✅ DB time check:', result.rows[0]);
  }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})