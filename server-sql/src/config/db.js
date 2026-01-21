import mysql2 from 'mysql2/promise';
import envConfig from './envConfig.js';

const pool = mysql2.createPool({
    host: envConfig.database.host,
    user: envConfig.database.user,
    password: envConfig.database.password,
    database: envConfig.database.name,
    port: envConfig.database.port ? parseInt(envConfig.database.port) : 3306,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established successfully.');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export { pool, checkConnection };
