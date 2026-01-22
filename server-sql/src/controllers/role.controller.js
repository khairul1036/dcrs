import { pool } from "../config/db.js";

/**
 * @desc    Create new role
 * @route   POST /api/roles
 */
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Role name is required" });
        }

        // Check duplicate
        const [exists] = await pool.query(
            "SELECT id FROM roles WHERE name = ?",
            [name]
        );
        if (exists.length > 0) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const [result] = await pool.query(
            "INSERT INTO roles (name) VALUES (?)",
            [name]
        );

        res.status(201).json({
            message: "Role created successfully",
            role: {
                id: result.insertId,
                name,
            },
        });
    } catch (error) {
        console.error("CREATE ROLE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Get all roles
 * @route   GET /api/roles
 */
export const getAllRoles = async (req, res) => {
    try {
        const [roles] = await pool.query(
            "SELECT id, name, createdAt, updatedAt FROM roles ORDER BY id DESC"
        );

        res.status(200).json({
            message: "Roles fetched successfully",
            data: roles,
        });
    } catch (error) {
        console.error("GET ROLES ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Get single role by id
 * @route   GET /api/roles/:id
 */
export const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            "SELECT id, name, createdAt, updatedAt FROM roles WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({
            message: "Role fetched successfully",
            data: rows[0],
        });
    } catch (error) {
        console.error("GET ROLE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Update role
 * @route   PUT /api/roles/:id
 */
export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Role name is required" });
        }

        // -------- Fetch the current role --------
        const [rows] = await pool.query("SELECT name FROM roles WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        const currentRoleName = rows[0].name.toLowerCase();

        // -------- Prevent updating 'admin' or 'user' roles --------
        if (currentRoleName === "admin" || currentRoleName === "user") {
            return res.status(403).json({
                message: `Cannot update the '${currentRoleName}' role`
            });
        }

        // -------- Update role --------
        const [result] = await pool.query(
            "UPDATE roles SET name = ? WHERE id = ?",
            [name, id]
        );

        res.status(200).json({
            message: "Role updated successfully",
        });
    } catch (error) {
        console.error("UPDATE ROLE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


/**
 * @desc    Delete role
 * @route   DELETE /api/roles/:id
 */
export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM roles WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({
            message: "Role deleted successfully",
        });
    } catch (error) {
        console.error("DELETE ROLE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
