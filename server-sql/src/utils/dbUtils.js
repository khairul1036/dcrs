import { pool } from "../config/db.js";

const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phoneNumber VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        roleId INT DEFAULT 2,
        designation VARCHAR(100),
        division VARCHAR(50),
        district VARCHAR(50),
        upazila VARCHAR(50),
        unionName VARCHAR(50),
        region VARCHAR(50),
        locationDivision VARCHAR(50),
        latitude DECIMAL(10, 7),
        longitude DECIMAL(10, 7),
        hotspot VARCHAR(100),
        whatsapp VARCHAR(20),
        status VARCHAR(50) DEFAULT 'pending',
        block VARCHAR(50),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

const createTable = async (tableName, tableQuery) => {
    try {
        await pool.query(tableQuery);
        console.log(`Table '${tableName}' created or already exists.`);
    } catch (error) {
        console.error(`Error creating table '${tableName}':`, error);
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