import { useState } from "react";

const UserApproval = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    // JSON DATA
    const users = [
        {
            id: 1,
            username: "01637463845",
            name: "Faysal",
            email: "info@faysal.com",
            role: "User",
            status: "approved",
        },
        {
            id: 2,
            username: "Riyadh111",
            name: "Riyadh",
            email: "riyadh@gmail.com",
            role: "User",
            status: "rejected",
        },
        {
            id: 3,
            username: "01799232675",
            name: "Apon Paul",
            email: "apon@gmail.com",
            role: "User",
            status: "not-approved",
        },
    ];

    // Status badge style
    const statusStyle = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        "not-approved": "bg-yellow-100 text-yellow-700",
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    User Approval
                </h2>
                <p className="text-sm text-gray-500">
                    Manage user approval requests
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-xl shadow-sm border-gray-400 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search User
                        </label>
                        <input
                            type="text"
                            placeholder="Username / Email / Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        >
                            <option value="all">All</option>
                            <option value="approved">Approved</option>
                            <option value="not-approved">Not Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort By
                        </label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border-gray-500 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">Username</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">
                                    {user.username}
                                </td>
                                <td className="px-4 py-3">
                                    {user.name}
                                </td>
                                <td className="px-4 py-3">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3">
                                    {user.role}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[user.status]}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center space-x-2">
                                    {user.status !== "approved" && (
                                        <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs">
                                            Approve
                                        </button>
                                    )}
                                    {user.status !== "rejected" && (
                                        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs">
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserApproval;
