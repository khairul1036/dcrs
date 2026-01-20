import { pool } from "../config/db.js";

const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
    )
`;



const createTable = async (tableName, tableQuery) => {
    try {
        await pool.query(tableQuery);
        console.log(`Table '${tableName}' created or already exists.`);
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};


const createAllTables = async () => {
    try {
        await createTable('users', userTableQuery);
    }
    catch (error) {
        console.error("Error creating tables:", error);
    }
}

export default createAllTables;