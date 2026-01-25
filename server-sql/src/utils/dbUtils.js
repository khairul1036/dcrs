import { pool } from "../config/db.js";
import seed from "../config/seed.js";
import { hazardCalendarTableQuery, hazardSeasonsTableQuery, mostDangerousHazardTableQuery, selectedHazardsTableQuery, surveyTableQuery } from "./dbTablequery/climateIncidentSurveys.js";


const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phoneNumber VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        roleId INT NOT NULL,
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
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (roleId) REFERENCES roles(id)
    )
`;

const roleTableQuery = `
    CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

const permissionTableQuery = `
    CREATE TABLE IF NOT EXISTS permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

const rolePermissionTableQuery = `
    CREATE TABLE IF NOT EXISTS role_permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        roleId INT NOT NULL,
        permissionId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_role_permission (roleId, permissionId),
        FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permissionId) REFERENCES permissions(id) ON DELETE CASCADE
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
        await createTable("roles", roleTableQuery);
        await createTable("permissions", permissionTableQuery);
        await createTable("users", userTableQuery);
        await createTable("role_permissions", rolePermissionTableQuery);

        // Climate Incident Survey Tables
        await createTable("surveys", surveyTableQuery);
        await createTable("survey_selected_hazards", selectedHazardsTableQuery);
        await createTable("survey_hazard_calendar", hazardCalendarTableQuery);
        await createTable("survey_hazard_seasons", hazardSeasonsTableQuery);
        await createTable("survey_most_dangerous_hazard", mostDangerousHazardTableQuery);


        // CHECK BEFORE SEED
        const [rows] = await pool.query(
            "SELECT COUNT(*) as count FROM users"
        );

        if (rows[0].count === 0) {
            console.log("🟡 First time setup detected → Running seed...");
            await seed();
        } else {
            console.log("🟢 Seed already done → Skipping");
        }

    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

export default createAllTables;