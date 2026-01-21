export const userRegistrationEmail = ({
    name,
    username,
    password,
    email,
    phoneNumber,
}) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
            <h2>Welcome, ${name}</h2>
            <p>Your account has been created successfully.</p>
            <hr/>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <br/>
            <p style="color:red;">
                ⚠ Please change your password after first login.
            </p>
            <br/>
            <p>Thank you,<br/>System Admin</p>
        </div>
    `;
};



export const passwordResetEmail = ({ name, username, newPassword }) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
            <h2>Password Reset Successful</h2>
            <p>Dear ${name},</p>
            <p>Your password has been reset successfully.</p>
            <hr/>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>New Password:</strong> ${newPassword}</p>
            <br/>
            <p style="color:red;">
                ⚠ Please change your password after logging in with the new password.
            </p>
            <br/>
            <p>Thank you,<br/>System Admin</p>
        </div>
    `;
}