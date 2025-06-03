import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    server: process.env.db_server,
    options: {
        port: parseInt(process.env.db_port),
        encrypt: false,
        trustServerCertificate: true
    }
}

const pool = new sql.ConnectionPool(config);
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connection Successful.');
    } catch (error) {
        console.log('Failed to coonect DB.', error);
    }
}
console.log("Using DB:", config.database);

export {sql, pool, connectDB};