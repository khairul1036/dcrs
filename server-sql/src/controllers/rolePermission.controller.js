import { pool } from "../config/db.js";


// GET ALL PERMISSIONS
export const getAllPermissions = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, name FROM permissions ORDER BY name ASC"
        );

        res.status(200).json({
            success: true,
            count: rows.length,
            permissions: rows,
        });
    } catch (error) {
        console.error("Get Permissions Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch permissions",
        });
    }
};


/**
 * @desc    Get a role with its permissions
 * @route   GET /api/roles/:id/permissions
 */
export const getRolePermissions = async (req, res) => {
    try {
        const { id } = req.params;

        const [roleRows] = await pool.query(
            "SELECT id, name FROM roles WHERE id = ?",
            [id]
        );
        if (roleRows.length === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        const role = roleRows[0];

        const [assignedPermissions] = await pool.query(
            `SELECT p.id, p.name
             FROM permissions p
             JOIN role_permissions rp ON p.id = rp.permissionId
             WHERE rp.roleId = ?`,
            [id]
        );

        res.status(200).json({
            role,
            permissions: assignedPermissions,
        });
    } catch (error) {
        console.error("GET ROLE PERMISSIONS ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


/**
 * @desc    Update role's permissions
 * @route   PUT /api/roles/:id/permissions
 */
export const updateRolePermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissionIds } = req.body;

        // console.log(id, permissionIds)

        if (!Array.isArray(permissionIds)) {
            return res.status(400).json({ message: "permissionIds must be an array" });
        }

        // -------- Fetch role --------
        const [roleRows] = await pool.query("SELECT name FROM roles WHERE id = ?", [id]);
        if (roleRows.length === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        const roleName = roleRows[0].name.toLowerCase();

        if (roleName === "admin") {
            return res.status(403).json({ message: `Cannot update permissions for '${roleName}' role` });
        }

        // -------- Remove old permissions --------
        await pool.query("DELETE FROM role_permissions WHERE roleId = ?", [id]);

        // -------- Assign new permissions --------
        for (const permissionId of permissionIds) {
            await pool.query(
                "INSERT INTO role_permissions (roleId, permissionId) VALUES (?, ?)",
                [id, permissionId]
            );
        }

        res.status(200).json({ message: "Role permissions updated successfully" });
    } catch (error) {
        console.error("UPDATE ROLE PERMISSIONS ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
