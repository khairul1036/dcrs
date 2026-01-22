import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

// ================= PERMISSIONS =================
const permissions = [
    "Roles",
    "Permissions",
    "User List",
    "User Approval",
    "User Edit",
    "User Delete",
    "Dataset Create",
    "Dataset Delete",
    "Dataset View",
    "Dataset Edit",
    "Dataset Share",
    "Data Access Requests",
    "Data Access Approve",
    "Data Access Reject",
    "Survey Create",
    "Survey Edit",
    "Survey Delete",
    "Survey View",
    "Survey Submit",
    "Survey Responses",
    "Growth Stage Add",
    "Growth Stage Edit",
    "Growth Stage Delete",
    "Disease Survey Add",
    "Disease Survey Edit",
    "Disease Survey Delete",
    "Insect Survey Add",
    "Insect Survey Edit",
    "Insect Survey Delete",
    "Questionnaire Survey Add",
    "Questionnaire Survey Edit",
    "Questionnaire Survey Delete",
    "Add Data",
    "View Data",
    "Edit Data",
    "Delete Data",
    "Export Data",
    "Import Data",
    "Secondary Source View",
    "Secondary Source Request",
    "Climate Visualization",
    "Reports",
    "Settings",
    "Change Password",
    "Change Role",
    "Profile",
];

// ================= INSERT PERMISSIONS =================
const insertPermissions = async () => {
    for (const permission of permissions) {
        await pool.query(
            `INSERT IGNORE INTO permissions (name) VALUES (?)`,
            [permission]
        );
    }
    console.log("✅ Permissions inserted");
};

// ================= CREATE DEFAULT ROLES =================
const createDefaultRoles = async () => {
    // Admin role
    let [rows] = await pool.query("SELECT id FROM roles WHERE name = 'admin'");
    let adminRoleId;
    if (rows.length > 0) {
        adminRoleId = rows[0].id;
    } else {
        const [result] = await pool.query("INSERT INTO roles (name) VALUES ('admin')");
        console.log("✅ Admin role created");
        adminRoleId = result.insertId;
    }

    // User role
    [rows] = await pool.query("SELECT id FROM roles WHERE name = 'user'");
    if (rows.length === 0) {
        const [result] = await pool.query("INSERT INTO roles (name) VALUES ('user')");
        console.log("✅ User role created");
    }

    return adminRoleId;
};

// ================= CREATE DEFAULT ADMIN USER =================
const createAdminUser = async (adminRoleId) => {
    const adminEmail = "admin@system.com";

    const [existing] = await pool.query(
        `SELECT id FROM users WHERE email = ?`,
        [adminEmail]
    );

    if (existing.length > 0) {
        console.log("ℹ️ Admin user already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await pool.query(
        `INSERT INTO users
        (username, name, email, phoneNumber, password, role, roleId, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "admin",
            "System Admin",
            adminEmail,
            "01712345678",
            hashedPassword,
            "admin",
            adminRoleId,
            "approved",
        ]
    );

    console.log("✅ Default admin user created");
    console.log("📧 Phone: 01712345678");
    console.log("🔑 Password: 123456");
};

// ================= ASSIGN ALL PERMISSIONS TO ADMIN =================
const assignPermissionsToAdmin = async (adminRoleId) => {
    const [permissionRows] = await pool.query(
        `SELECT id FROM permissions`
    );

    for (const permission of permissionRows) {
        await pool.query(
            `INSERT IGNORE INTO role_permissions (roleId, permissionId)
            VALUES (?, ?)`,
            [adminRoleId, permission.id]
        );
    }

    console.log("✅ All permissions assigned to admin role");
};

// ================= RUN SEED =================
const seed = async () => {
    try {
        await insertPermissions();

        const adminRoleId = await createDefaultRoles();

        await assignPermissionsToAdmin(adminRoleId);
        await createAdminUser(adminRoleId);

        console.log("🎉 Database seeding completed");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }
};

export default seed;
