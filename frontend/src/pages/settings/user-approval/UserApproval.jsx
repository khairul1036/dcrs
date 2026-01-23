import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { ErrorAlert, SuccessAlert } from "../../../components/swal/swalAlert";

const UserApproval = () => {
    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Allowed statuses according to backend
    const allowedStatus = ["approved", "rejected", "blocked", "pending"];

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axiosSecure.get("/user");

                // IMPORTANT: Ensure we always set an array
                const userData = Array.isArray(response.data)
                    ? response.data
                    : response.data?.users || response.data?.data || [];

                setUsers(userData);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to load users. Please try again later.");
                await ErrorAlert({
                    text: "Users could not be loaded. Please check your connection or try again.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    // Update user status with optimistic UI update + rollback on error
    const updateUserStatus = async (userId, newStatus) => {
        if (!allowedStatus.includes(newStatus)) {
            await ErrorAlert({ text: "Invalid status value" });
            return;
        }

        console.log(userId)
        // Optimistic update (show change immediately)
        const oldUsers = [...users];
        setUsers(prev =>
            prev.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );

        try {
            await axiosSecure.patch(`/user/approval/${userId}`, {
                status: newStatus,
            });

            await SuccessAlert({
                text: `User status updated to ${newStatus} successfully.`,
            });
        } catch (err) {
            console.error("Status update failed:", err);

            // Rollback UI to previous state on error
            setUsers(oldUsers);

            const errorMsg =
                err.response?.data?.message || "Failed to update user status";

            await ErrorAlert({ text: errorMsg });
            setError(errorMsg);
        }
    };

    // Filter users based on search and status
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            search === "" ||
            user.username?.toLowerCase().includes(search.toLowerCase()) ||
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || user.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Status badge styling
    const statusStyle = {
        approved: "bg-green-100 text-green-700 border border-green-200",
        rejected: "bg-red-100 text-red-700 border border-red-200",
        blocked: "bg-gray-100 text-gray-700 border border-gray-300",
        pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        "not-approved": "bg-orange-100 text-orange-700 border border-orange-200",
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-lg text-gray-600 animate-pulse">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Approval</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Review and manage user registration and approval requests
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search User
                        </label>
                        <input
                            type="text"
                            placeholder="Search by username, email or name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status Filter
                        </label>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort By
                        </label>
                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>By Name (A-Z)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left font-medium text-gray-700">Username</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-700">Name</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-700">Email</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-700">Role</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-700">Status</th>
                            <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No users found matching your search or filter criteria
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role || "User"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${statusStyle[user.status] || "bg-gray-100 text-gray-700"}`}
                                        >
                                            {user.status?.charAt(0).toUpperCase() + user.status?.slice(1) || "Unknown"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                                        {user.status !== "approved" && (
                                            <button
                                                onClick={() => updateUserStatus(user.id, "approved")}
                                                disabled={loading}
                                                className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {user.status !== "rejected" && (
                                            <button
                                                onClick={() => updateUserStatus(user.id, "rejected")}
                                                disabled={loading}
                                                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {/* {user.status !== "blocked" && user.status !== "rejected" && (
                                            <button
                                                onClick={() => updateUserStatus(user.id, "blocked")}
                                                disabled={loading}
                                                className="px-3.5 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Block
                                            </button>
                                        )} */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserApproval;