import { pool } from "../config/db.js";

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        // get user in on JWT middleware
        const userId = req.user.id;

        // -------- Fetch user from DB --------
        const [rows] = await pool.query(
            `SELECT username,
            name,
            email,
            role,
            designation,
            division,
            whatsapp,
            status,
            block,
            region,
            district,
            upazila,
            unionName,
            latitude,
            longitude,
            hotspot,
            locationDivision,
            roleId
        FROM users
        WHERE id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

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

