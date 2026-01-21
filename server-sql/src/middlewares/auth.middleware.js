import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, envConfig.auth.jwtSecret);
        req.user = decoded; // JWT payload, e.g., {id, phoneNumber, role}
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
