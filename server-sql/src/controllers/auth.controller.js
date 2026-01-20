import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import UserModel from "../models/users.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// Register
export const register = async (req, res) => {
    try {
        const { name, phoneNumber, email, designation, division, whatsapp } = req.body;

        if (!name || !email || !phoneNumber) {
            return res.status(400).json({ message: "Name, email, and phone number are required" });
        }

        // --- Generate username from email ---
        let username = email.split("@")[0];
        let tempUsername = username;
        let counter = 1;

        while (true) {
            const [existing] = await pool.query("SELECT * FROM users WHERE username = ?", [tempUsername]);
            if (existing.length === 0) break;
            tempUsername = username + counter;
            counter++;
        }
        username = tempUsername;

        // --- Check if email already exists ---
        const [existingEmail] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // --- Insert into database ---
        const query = `
      INSERT INTO users 
      (username, name, phoneNumber, email, designation, division, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [
            username,
            name,
            phoneNumber,
            email,
            designation || null,
            division || null,
            whatsapp || null,
        ];

        const [result] = await pool.query(query, values);

        // --- Prepare response ---
        const newUser = {
            id: result.insertId,
            username,
            name,
            phoneNumber: phoneNumber,
            email,
            designation: designation || null,
            division: division || null,
            whatsapp: whatsapp || null,
        };

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        const user = rows[0];
        if (!user) return res.status(400).json({ message: "Invalid username or password" });

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid username or password" });

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password before sending response
        delete user.password;

        res.json({ message: "Login successful", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
