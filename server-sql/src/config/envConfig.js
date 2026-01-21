import dotenv from "dotenv";

dotenv.config();

const envConfig = {
    env: process.env.NODE_ENV || "development",

    server: {
        port: Number(process.env.SERVER_PORT) || 5000,
    },

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 3306,
    },

    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
        bcryptSaltRounds: Number(process.env.BCRYPTJS_SALT_ROUNDS) || 10,
    },

    email: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    frontend: {
        url: process.env.FRONTEND_URL,
    },
};

export default envConfig;
