import { sql, pool } from "../config/db.js";

export const insertUrl = async (long_url, short_code) => {
    const result = await pool.request()
        .input('long_url', sql.VarChar, long_url)
        .input('short_code', sql.VarChar, short_code)
        .query('insert into urls (long_url, short_code) values(@long_url, @short_code)');
    return result;
}

export const getUrlByCode = async (short_code) => {
    const result = await pool.request()
        .input('short_code', sql.VarChar, short_code)
        .query('select long_url from urls where short_code = @short_code');
    return result.recordset[0];
}

export const incrementClickCount = async (short_code) => {
    const result = await pool.request()
        .input('short_code', sql.VarChar, short_code)
        .query('update urls set click_count = click_count + 1 where short_code = @short_code');
    return result;
}