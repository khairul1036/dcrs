import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const UpdatePassword = () => {
    const axiosSecure = useAxiosSecure();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Match Error",
                text: "New passwords do not match!",
            });
            return;
        }

        try {
            const response = await axiosSecure.put("/auth/update-password", {
                oldPassword,
                newPassword,
                confirmPassword
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Password updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.response?.data?.message || "Something went wrong!",
            });
        }
    };

    return (
        <div className="p-4 flex-1 min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Old Password
                        </label>
                        <input
                            type="password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition-colors font-medium"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
