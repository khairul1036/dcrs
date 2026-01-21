import bcrypt from "bcryptjs";
import envConfig from "../config/envConfig.js";

export const generatePassword = (length = 10) => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, envConfig.auth.bcryptSaltRounds);
};
