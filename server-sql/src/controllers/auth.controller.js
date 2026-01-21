import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import { userRegistrationEmail } from "../utils/email/emailTemplates.js";
import { sendEmail } from "../utils/email/emailSender.js";
import { generatePassword, hashPassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/jwt.js";


// Register
export const register = async (req, res) => {
    try {
        const { name, phoneNumber, email, designation, division, whatsapp } = req.body;

        if (!name || !email || !phoneNumber) {
            return res.status(400).json({
                message: "Name, email, and phone number are required",
            });
        }

        // -------- Generate unique username --------
        const baseUsername = email.split("@")[0];
        let username = baseUsername;
        let counter = 1;

        while (true) {
            const [exists] = await pool.query(
                "SELECT id FROM users WHERE username = ?",
                [username]
            );
            if (exists.length === 0) break;
            username = `${baseUsername}${counter++}`;
        }

        // -------- Check email --------
        const [emailExists] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );
        if (emailExists.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // -------- Password --------
        const plainPassword = generatePassword();
        const hashedPassword = await hashPassword(plainPassword);

        // -------- Insert user --------
        const query = `
            INSERT INTO users
            (username, name, phoneNumber, email, password, role, designation, division, whatsapp, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            username,
            name,
            phoneNumber,
            email,
            hashedPassword,
            "user",
            designation || null,
            division || null,
            whatsapp || null,
            "pending",
        ];

        const [result] = await pool.query(query, values);

        // -------- Send email --------
        const emailHTML = userRegistrationEmail({
            name,
            username,
            password: plainPassword,
            email,
            phoneNumber,
        });

        await sendEmail({
            to: email,
            subject: "Your Account Login Credentials",
            html: emailHTML,
        });

        // -------- Response --------
        res.status(201).json({
            message: "User registered successfully. Credentials sent via email.",
            user: {
                id: result.insertId,
                username,
                name,
                phoneNumber,
                email,
                designation,
                division,
                whatsapp,
            },
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({
                message: "Phone number and password are required",
            });
        }

        // -------- Find user by phone number --------
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE phoneNumber = ?",
            [phoneNumber]
        );

        const user = rows[0];
        if (!user) {
            return res.status(400).json({
                message: "Invalid phone number",
            });
        }

        // -------- Compare password --------
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // -------- Generate JWT --------
        const token = generateToken({
            id: user.id,
            phoneNumber: user.phoneNumber,
            role: user.role,
        });

        // -------- Remove sensitive data --------
        delete user.password;

        res.status(200).json({
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};