import { pool } from "../config/db.js";

/**
 * @param {string} permissionName
 * @example hasPermission("User Delete")
 */

export const hasPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access",
                });
            }

            const userId = req.user.id;

            // -------- Get user role --------
            const [userRows] = await pool.query(
                "SELECT roleId FROM users WHERE id = ?",
                [userId]
            );

            if (userRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const roleId = userRows[0].roleId;

            // -------- Check permission --------
            const [permissionRows] = await pool.query(
                `
                SELECT p.name
                FROM role_permissions rp
                JOIN permissions p ON rp.permissionId = p.id
                WHERE rp.roleId = ? AND p.name = ?
                `,
                [roleId, permissionName]
            );

            if (permissionRows.length === 0) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied",
                    error: `You do not have '${permissionName}' permission`,
                });
            }

            next();
        } catch (error) {
            console.error("PERMISSION MIDDLEWARE ERROR:", error);
            res.status(500).json({
                success: false,
                message: "Permission check failed",
            });
        }
    };
};
