import React from 'react';

const ViewData = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        View Data Repository
                    </h1>
                    <p className="text-gray-600">
                        Browse and analyze rice data from the BRRI database
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        Select Data Type
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data Type
                            </label>
                            <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200">
                                <option value="">-- Select Data Type --</option>
                                <option value="seasonal">Seasonal Rice Data</option>
                                <option value="all-season">All Season Data</option>
                                <option value="rice-adoption-rate">Rice Adoption Rate Data</option>
                                <option value="district">District-wise Rice Data</option>
                                <option value="export-import">Rice Export-Import Data</option>
                                <option value="cropping-intensity">Cropping Intensity Data</option>
                                <option value="faostat">FAOStat Data</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data Category
                            </label>
                            <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200">
                                <option value="area">Area (000' ha)</option>
                                <option value="production">Production (000' MT)</option>
                                <option value="yield">Yield (MT/ha)</option>
                            </select>
                        </div>
                    </div>

                    {/* Result count info */}
                    <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
                        <svg
                            className="w-6 h-6 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-base font-medium">50 records found</span>
                    </div>
                </div>

                {/* Main Table Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            Seasonal Rice Data - Area (000' ha)
                        </h2>

                        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <span>Add Data</span>
                            </button>

                            <button className="flex-1 sm:flex-none px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-linear-to-r from-green-600 to-green-700 text-white">
                                {/* First header row - main categories */}
                                <tr>
                                    <th className="px-4 py-4 text-left text-sm font-semibold border-r border-green-800">
                                        Year
                                    </th>
                                    <th
                                        colSpan={4}
                                        className="px-4 py-4 text-center text-sm font-semibold border-r border-green-800"
                                    >
                                        Aus Season
                                    </th>
                                    <th
                                        colSpan={5}
                                        className="px-4 py-4 text-center text-sm font-semibold border-r border-green-800"
                                    >
                                        Aman Season (T.Aman + B.Aman)
                                    </th>
                                    <th
                                        colSpan={4}
                                        className="px-4 py-4 text-center text-sm font-semibold border-r border-green-800"
                                    >
                                        Boro Season
                                    </th>
                                    <th
                                        colSpan={2}
                                        className="px-4 py-4 text-center text-sm font-semibold border-r border-green-800"
                                    >
                                        Total
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>

                                {/* Second header row - sub categories */}
                                <tr className="bg-green-700">
                                    <th className="px-4 py-3 text-left text-xs font-medium border-r border-green-800" />

                                    <th className="px-3 py-3 text-center text-xs font-medium">MV</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">LV</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">Total</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium border-r border-green-800">
                                        MV %
                                    </th>

                                    <th className="px-3 py-3 text-center text-xs font-medium">
                                        T.Aman MV
                                    </th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">
                                        T.Aman LV
                                    </th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">
                                        B.Aman
                                    </th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">Total</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium border-r border-green-800">
                                        MV %
                                    </th>

                                    <th className="px-3 py-3 text-center text-xs font-medium">MV</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">LV</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium">Total</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium border-r border-green-800">
                                        MV %
                                    </th>

                                    <th className="px-3 py-3 text-center text-xs font-medium">
                                        Grand Total
                                    </th>
                                    <th className="px-3 py-3 text-center text-xs font-medium border-r border-green-800">
                                        MV %
                                    </th>

                                    <th className="px-3 py-3 text-center text-xs font-medium" />
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Example row - you can map this */}
                                <tr className="hover:bg-green-50 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 border-r">
                                        2024
                                    </td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-700">966.73</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-700">68.01</td>
                                    <td className="px-3 py-4 text-sm font-medium text-center bg-green-50">
                                        1034.75
                                    </td>
                                    <td className="px-3 py-4 text-sm font-medium text-center text-green-700 border-r">
                                        93.43%
                                    </td>

                                    <td className="px-3 py-4 text-sm text-center text-gray-700">4938.18</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-700">585.39</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-700">227.05</td>
                                    <td className="px-3 py-4 text-sm font-medium text-center bg-blue-50">
                                        5523.57
                                    </td>
                                    <td className="px-3 py-4 text-sm font-medium text-center text-blue-700 border-r">
                                        85.87%
                                    </td>

                                    <td className="px-3 py-4 text-sm text-center text-gray-700">4854.72</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-700">22.87</td>
                                    <td className="px-3 py-4 text-sm font-medium text-center bg-orange-50">
                                        4877.59
                                    </td>
                                    <td className="px-3 py-4 text-sm font-medium text-center text-orange-700 border-r">
                                        99.53%
                                    </td>

                                    <td className="px-3 py-4 text-sm font-bold text-center bg-linear-to-r from-green-50 to-green-100">
                                        -
                                    </td>
                                    <td className="px-3 py-4 text-sm font-bold text-green-800 text-center border-r bg-linear-to-r from-green-50 to-green-100">
                                        92.25%
                                    </td>

                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-gray-50 rounded-lg border">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{' '}
                            <span className="font-medium">50</span> of{' '}
                            <span className="font-medium">53</span> records
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                disabled
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                            >
                                Prev
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium">
                                1
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewData;