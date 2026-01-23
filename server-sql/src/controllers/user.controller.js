import { pool } from "../config/db.js";

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // -------- Fetch user --------
        const [rows] = await pool.query(
            `SELECT 
                u.id,
                u.username,
                u.name,
                u.email,
                u.role,
                u.designation,
                u.division,
                u.whatsapp,
                u.status,
                u.block,
                u.region,
                u.district,
                u.upazila,
                u.unionName,
                u.latitude,
                u.longitude,
                u.hotspot,
                u.locationDivision,
                u.roleId
            FROM users u
            WHERE u.id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        // -------- Fetch permissions based on roleId --------
        const [permissionRows] = await pool.query(
            `SELECT p.id, p.name
             FROM permissions p
             JOIN role_permissions rp ON rp.permissionId = p.id
             WHERE rp.roleId = ?`,
            [user.roleId]
        );

        const permissions = permissionRows.map(p => p.name);

        // attach permissions
        user.permissions = permissions;

        res.status(200).json({
            message: "User profile fetched successfully",
            user,
        });

    } catch (error) {
        console.error("GET USER PROFILE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update User Profile 
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const allowedFields = [
            "name",
            "email",
            "designation",
            "division",
            "whatsapp",
            "region",
            "district",
            "upazila",
            "unionName",
            "latitude",
            "longitude",
            "hotspot",
            "locationDivision",
        ];

        const updates = [];
        const values = [];

        // Loop through allowed fields and add to updates only if present in req.body
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates.push(`${field} = ?`);
                values.push(req.body[field]);
            }
        });

        if (updates.length === 0) {
            return res.status(400).json({ message: "No valid fields provided to update" });
        }

        // -------- Check email duplicate if email is being updated --------
        if (req.body.email) {
            const [emailCheck] = await pool.query(
                "SELECT id FROM users WHERE email = ? AND id != ?",
                [req.body.email, userId]
            );
            if (emailCheck.length > 0) {
                return res.status(400).json({ message: "Email already in use by another user" });
            }
        }

        // -------- Build dynamic query --------
        const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
        values.push(userId);

        await pool.query(query, values);

        // -------- Fetch updated user --------
        const [updatedRows] = await pool.query(
            `
      SELECT username, name, phoneNumber, email, role, designation, division, whatsapp,
             region, district, upazila, unionName, latitude, longitude, hotspot, locationDivision, status
      FROM users WHERE id = ?
      `,
            [userId]
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedRows[0],
        });
    } catch (error) {
        console.error("UPDATE USER PROFILE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// get all users with (Username, Name, Email, Role, Status)
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(`
            SELECT id, username, name, email, phoneNumber, role, status
            FROM users
        `);

        res.status(200).json({
            message: "Users retrieved successfully",
            users: users
        });
    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update User Approval Status
export const updateUserApprovalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const loggedInUser = req.user;

        const allowedStatus = ["approved", "rejected", "blocked", "pending"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status. Allowed: approved, rejected, blocked, pending"
            });
        }

        // Prevent self status change
        if (loggedInUser.id == id) {
            return res.status(403).json({
                message: "You cannot change your own status"
            });
        }

        // Get target user
        const [userRows] = await pool.query(
            "SELECT id, role, status FROM users WHERE id = ?",
            [id]
        );

        if (!userRows.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const targetUser = userRows[0];

        // Prevent changing Admin status
        if (targetUser.role.toLowerCase() === "admin") {
            return res.status(403).json({
                message: "Admin status cannot be modified"
            });
        }

        // Update status
        await pool.query(
            "UPDATE users SET status = ? WHERE id = ?",
            [status, id]
        );

        res.status(200).json({
            message: `User status updated to '${status}' successfully`,
            userId: id,
            newStatus: status
        });

    } catch (error) {
        console.error("USER APPROVAL UPDATE ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update user details

export const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUser = req.user;
        const updates = { ...req.body };

        // Get target user
        const [userRows] = await pool.query(
            "SELECT id, role, roleId FROM users WHERE id = ?",
            [id]
        );

        if (!userRows.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const targetUser = userRows[0];

        // Non-admin restrictions
        if (loggedInUser.role.toLowerCase() !== "admin") {
            if ("username" in updates || "phoneNumber" in updates) {
                return res.status(403).json({
                    message: "You cannot update username or phone number",
                });
            }

            if ("role" in updates || "roleId" in updates) {
                return res.status(403).json({
                    message: "You cannot change role",
                });
            }

            if (loggedInUser.id !== targetUser.id) {
                return res.status(403).json({
                    message: "You cannot update other users",
                });
            }
        }

        // If role is being updated → fetch roleId automatically
        if (updates.role) {
            const [roleRows] = await pool.query(
                "SELECT id FROM roles WHERE name = ?",
                [updates.role]
            );

            if (!roleRows.length) {
                return res.status(400).json({ message: "Invalid role name" });
            }

            updates.roleId = roleRows[0].id; // sync roleId
        }

        // Prevent manual roleId mismatch
        if (updates.roleId && !updates.role) {
            return res.status(400).json({
                message: "RoleId cannot be updated directly. Provide role name.",
            });
        }

        // Build update query
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        values.push(id);

        const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

        await pool.query(query, values);

        res.status(200).json({
            message: "User details updated successfully",
            updatedFields: Object.keys(updates)
        });

    } catch (error) {
        console.error("UPDATE USER DETAILS ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// delete user 
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;        // target user id
        const loggedInUser = req.user;    // from JWT

        // Get target user
        const [userRows] = await pool.query(
            "SELECT id, role FROM users WHERE id = ?",
            [id]
        );

        if (!userRows.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const targetUser = userRows[0];

        // Admin cannot delete other roles
        if (
            loggedInUser.role.toLowerCase() === "admin" &&
            targetUser.role.toLowerCase() !== "admin"
        ) {
            return res.status(403).json({
                message: "Admin cannot delete users of other roles"
            });
        }

        // Optional: prevent self delete
        if (loggedInUser.id == id) {
            return res.status(403).json({
                message: "You cannot delete your own account"
            });
        }

        // Delete user
        await pool.query("DELETE FROM users WHERE id = ?", [id]);

        res.status(200).json({
            message: "User deleted successfully",
            deletedUserId: id
        });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
