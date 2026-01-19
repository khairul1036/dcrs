import React, { useState } from 'react';

const requestsData = [
    {
        id: 1,
        name: "Dr ABM Zahid Hossain",
        email: "zahidiwm2001@gmail.com",
        organization: "BRRI",
        designation: "SSO and Coordinator, Agromet Lab",
        sources: 1,
        date: "1/19/2026",
        status: "Accepted",
    },
    {
        id: 2,
        name: "Dr ABM Zahid Hossain",
        email: "zahidiwm2001@gmail.com",
        organization: "BRRI",
        designation: "SSO and Coordinator, Agromet Lab",
        sources: 1,
        date: "1/18/2026",
        status: "Accepted",
    },
    {
        id: 3,
        name: "Dr ABM Zahid Hossain",
        email: "zahidiwm2001@gmail.com",
        organization: "BRRI",
        designation: "SSO and Coordinator, Agromet Lab",
        sources: 1,
        date: "1/18/2026",
        status: "Pending",
    },
    {
        id: 4,
        name: "Faysal Ahmad Patwary",
        email: "faiz4121820@gmail.com",
        organization: "BRRI",
        designation: "SAAO",
        sources: 2,
        date: "1/17/2026",
        status: "Accepted",
    },
];

const DataAccessRequests = () => {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredRequests = requestsData.filter((request) => {
        const matchesFilter =
            filter === "All" ||
            request.status.toLowerCase() === filter.toLowerCase();

        const matchesSearch =
            request.name.toLowerCase().includes(search.toLowerCase()) ||
            request.email.toLowerCase().includes(search.toLowerCase()) ||
            request.organization.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const getStatusStyle = (status) => {
        if (status === "Accepted")
            return "bg-green-100 text-green-800 border-green-300";
        if (status === "Pending")
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        if (status === "Rejected")
            return "bg-red-100 text-red-800 border-red-300";
        return "";
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    📋 Data Access Requests
                </h1>
                <p className="text-gray-600">
                    Manage and review all secondary data access requests
                </p>
            </div>

            {/* Filter & Search */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Filter by Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {["All", "Pending", "Accepted", "Rejected"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === status
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Requests
                        </label>
                        <input
                            type="text"
                            placeholder="Search by name, email, or organization..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-gray-800">11</div>
                        <div className="text-sm text-gray-600 mt-1">Total Requests</div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200 text-center">
                        <div className="text-3xl font-bold text-yellow-800">5</div>
                        <div className="text-sm text-yellow-700 mt-1">Pending</div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-5 border border-green-200 text-center">
                        <div className="text-3xl font-bold text-green-800">6</div>
                        <div className="text-sm text-green-700 mt-1">Accepted</div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-5 border border-red-200 text-center">
                        <div className="text-3xl font-bold text-red-800">0</div>
                        <div className="text-sm text-red-700 mt-1">Rejected</div>
                    </div>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Organization
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Data Sources
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.id}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="font-semibold text-gray-900">{request.name}</div>
                                        <div className="text-xs text-gray-500">{request.email}</div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm text-gray-900">{request.organization}</div>
                                        <div className="text-xs text-gray-500">{request.designation}</div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {request.sources} source(s)
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {request.date}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                                                request.status
                                            )}`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                                title="View Details"
                                            >
                                                👁️ View
                                            </button>

                                            {request.status === "Pending" && (
                                                <>
                                                    <button
                                                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                                                        title="Accept"
                                                    >
                                                        ✓ Accept
                                                    </button>
                                                    <button
                                                        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                                                        title="Reject"
                                                    >
                                                        ✗ Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataAccessRequests;