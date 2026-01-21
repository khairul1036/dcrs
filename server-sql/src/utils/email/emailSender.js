import nodemailer from "nodemailer";
import envConfig from "../../config/envConfig.js";

const transporter = nodemailer.createTransport({
    host: envConfig.email.host,
    port: envConfig.email.port,
    secure: false, // true only for 465
    auth: {
        user: envConfig.email.user,
        pass: envConfig.email.pass,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"System Admin" <${envConfig.email.user}>`,
        to,
        subject,
        html,
    });
};
