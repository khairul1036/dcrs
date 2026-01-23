import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { SuccessAlert, ErrorAlert } from "../../../components/swal/swalAlert";
import Swal from "sweetalert2";

const ChangeUserDetails = () => {
    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]); // for dynamic role dropdown
    const [searchTerm, setSearchTerm] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    // Fetch users & roles on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [usersRes, rolesRes] = await Promise.all([
                    axiosSecure.get("/user"),
                    axiosSecure.get("/role"),
                ]);

                // Users
                const userData = Array.isArray(usersRes.data)
                    ? usersRes.data
                    : usersRes.data?.users || [];
                setUsers(userData);

                // Roles
                const roleData = Array.isArray(rolesRes.data)
                    ? rolesRes.data
                    : rolesRes.data?.roles || rolesRes.data?.data || [];
                setRoles(roleData);
            } catch (err) {
                console.error("Data fetch failed:", err);
                setError("Failed to load users or roles. Please try again.");
                await ErrorAlert({
                    text: "Could not load data. Check your connection or permissions.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure]);

    // Filtered users
    const filteredUsers = users.filter(
        (user) =>
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber?.includes(searchTerm) ||
            user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Refresh user list after update/delete
    const refreshUsers = async () => {
        try {
            const res = await axiosSecure.get("/user");
            const userData = Array.isArray(res.data) ? res.data : res.data?.users || [];
            setUsers(userData);
        } catch (err) {
            console.error("Refresh failed:", err);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser({ ...user });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!editingUser) return;

        try {
            await axiosSecure.patch(`/user/${editingUser.id}`, {
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
                // phoneNumber: editingUser.phoneNumber, 
            });

            await SuccessAlert({
                text: "User details updated successfully.",
            });

            refreshUsers();
            setEditingUser(null);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update user details";
            await ErrorAlert({ text: msg });
        }
    };

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! This user will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/user/${userId}`);
            await SuccessAlert({
                text: "User has been deleted successfully.",
            });
            refreshUsers();
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to delete user";
            await ErrorAlert({ text: msg });
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-lg text-gray-600 animate-pulse">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            {/* Header + Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <svg
                        className="text-3xl text-slate-600"
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z" />
                    </svg>
                    <h1 className="text-2xl sm:text-3xl font-bold text-black">Manage Users</h1>
                </div>

                <div className="relative w-full sm:w-96">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        width="1em"
                        height="1em"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                    >
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name, username, email, phone or role..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <p className="text-gray-600 mb-6">
                Showing {filteredUsers.length} of {users.length} users
            </p>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Username</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-600 font-medium">
                                    No users found matching your search criteria
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-700">{user.phoneNumber || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-sm transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-5">
                {filteredUsers.length === 0 ? (
                    <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
                        No users found
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="bg-white p-5 rounded-xl shadow border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{user.name}</h3>
                                    <p className="text-sm text-gray-600">{user.username}</p>
                                </div>
                                <span className="text-xs text-gray-500">#{user.id}</span>
                            </div>

                            <div className="space-y-2 mb-5 text-sm">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
                                <p>
                                    <strong>Role:</strong>{" "}
                                    <span className="inline-flex px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                                        {user.role}
                                    </span>
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEditClick(user)}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User Details</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingUser.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editingUser.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                                <select
                                    name="role"
                                    value={editingUser.role}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                >
                                    {roles.length > 0 ? (
                                        roles.map((role) => (
                                            <option key={role.id} value={role.name}>
                                                {role.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value={editingUser.role}>{editingUser.role}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeUserDetails;