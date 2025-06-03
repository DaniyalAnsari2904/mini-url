import pool from "../config/pg_db.js";

export const insertUrl = async (long_url, short_code) => {
    const query = 'INSERT INTO urls (long_url, short_code) VALUES ($1, $2)';
    const values = [long_url, short_code];
    const result = await pool.query(query, values);
    return result;
}

// Get original URL by short code
export const getUrlByCode = async (short_code) => {
    const query = 'SELECT long_url FROM urls WHERE short_code = $1';
    const values = [short_code];
    const result = await pool.query(query, values);
    return result.rows[0]; // PostgreSQL returns rows instead of recordset
}

// Increment click count
export const incrementClickCount = async (short_code) => {
    const query = 'UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1';
    const values = [short_code];
    const result = await pool.query(query, values);
    return result;
}