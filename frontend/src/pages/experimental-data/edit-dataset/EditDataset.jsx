import React from 'react';

const EditDataset = () => {
    return (
        <div className="p-4 flex-1">
            <div className="p-6">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Dataset: Faysal</h2>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50">
                                Save All Changes
                            </button>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Dataset Name *</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                    type="text"
                                    defaultValue="Faysal"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Experiment Name</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                    type="text"
                                    defaultValue="Ahmed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Season</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                    defaultValue=""
                                >
                                    <option value="">Select Season</option>
                                    <option value="Aus">Aus</option>
                                    <option value="Aman">Aman</option>
                                    <option value="Boro">Boro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Year</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                    type="number"
                                    defaultValue="2020"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Principal Investigator</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                    type="text"
                                    defaultValue="fay"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Co-Investigator</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                    type="text"
                                    defaultValue="sal"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Access Permissions */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center">
                                <svg
                                    className="mr-2 text-blue-500"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 640 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z" />
                                </svg>
                                Access Permissions (3 users)
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Permission
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expiry Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { name: "faysal3632", status: "pending", permission: "edit" },
                                        { name: "faysal4699", status: "approved", permission: "edit" },
                                        { name: "faysal36322", status: "pending", permission: "edit" },
                                    ].map((user, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <svg
                                                        className="text-gray-400 mr-2"
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 640 512"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                                                    </svg>
                                                    <span className="font-medium text-gray-900">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === "approved"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <select
                                                    defaultValue={user.permission}
                                                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                                                >
                                                    <option value="view">View Only</option>
                                                    <option value="edit">Edit</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <span className="text-green-600">No Expiry</span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <button
                                                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                                    title="Remove access"
                                                >
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 352 512"
                                                        height="14"
                                                        width="14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                                <strong>Note:</strong> Changes to permissions will be saved when you click "Save All Changes".
                            </p>
                        </div>
                    </div>

                    {/* Dataset Table */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Dataset (25 rows × 3 columns)</h3>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center space-x-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="12"
                                        width="12"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" />
                                    </svg>
                                    <span>Full Screen</span>
                                </button>
                                {/* Add Row & Add Column buttons can be added here */}
                            </div>
                        </div>

                        {/* Table - You can make this dynamic later */}
                        <div className="overflow-auto max-h-96 border border-gray-300 rounded">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 bg-gray-100 p-2 w-20">Row #</th>
                                        <th className="border border-gray-300 bg-gray-100 p-3 min-w-37.5">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    className="flex-1 p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none bg-white font-medium"
                                                    placeholder="Column 1"
                                                    type="text"
                                                    defaultValue="Fay1"
                                                />
                                                {/* Drag & Delete buttons */}
                                            </div>
                                        </th>
                                        <th className="border border-gray-300 bg-gray-100 p-3 min-w-37.5">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    className="flex-1 p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none bg-white font-medium"
                                                    placeholder="Column 2"
                                                    type="text"
                                                    defaultValue="f2"
                                                />
                                            </div>
                                        </th>
                                        <th className="border border-gray-300 bg-gray-100 p-3 min-w-37.5">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    className="flex-1 p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none bg-white font-medium"
                                                    placeholder="Column 3"
                                                    type="text"
                                                    defaultValue="f3"
                                                />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Sample rows - you should map real data here */}
                                    {[1, 2].map((row) => (
                                        <tr key={row} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 bg-gray-50 p-3 text-center sticky left-0 z-10 font-medium text-gray-700">
                                                {row}
                                            </td>
                                            <td className="border border-gray-300 p-1">
                                                <input
                                                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none min-h-10"
                                                    type="text"
                                                    defaultValue={row === 1 ? "aedrghe" : "tery"}
                                                />
                                            </td>
                                            <td className="border border-gray-300 p-1">
                                                <input
                                                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none min-h-10"
                                                    type="text"
                                                    defaultValue={row === 1 ? "eagyt" : "reth"}
                                                />
                                            </td>
                                            <td className="border border-gray-300 p-1">
                                                <input
                                                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none min-h-10"
                                                    type="text"
                                                    defaultValue={row === 1 ? "aetyg" : "ertyhwset"}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDataset;