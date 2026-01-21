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
            phoneNumber,
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
