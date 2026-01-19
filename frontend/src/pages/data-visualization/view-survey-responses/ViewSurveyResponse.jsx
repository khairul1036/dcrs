import React from "react";

const surveyResponses = [
    {
        id: 1,
        name: "Md Jakir Chowdhury",
        type: "SAAO",
        district: "Habiganj",
        upazila: "Shayestaganj",
        marks: "N/A",
        submitted: "Jan 12, 2026, 02:19 PM",
    },
    {
        id: 2,
        name: "Mahbub Alam Khan",
        type: "SAAO",
        district: "Moulvibazar",
        upazila: "Sreemangal",
        marks: "N/A",
        submitted: "Jan 12, 2026, 02:18 PM",
    },
    // add more responses here
];

const SurveyResponses = () => {
    return (
        <div className="p-4 flex-1 min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6">
                <div className="bg-linear-to-r from-[#026666] via-[#027777] to-[#035555] rounded-2xl shadow-xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full -translate-y-16 translate-x-16 sm:-translate-y-32 sm:translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white rounded-full translate-y-12 -translate-x-12 sm:translate-y-24 sm:-translate-x-24"></div>
                    </div>
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg shrink-0">
                                {/* Icon */}
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    className="w-7 h-7 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    SAAO Survey Questionnaire
                                </h1>
                                <p className="text-white/90 text-sm">
                                    View and manage all responses for this survey
                                </p>
                            </div>
                        </div>
                        <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors">
                            ← Back to Surveys
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="max-w-7xl mx-auto mb-6 bg-white rounded-xl shadow-md p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    Filter Responses
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Respondent Type
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent text-sm">
                            <option value="">All Types</option>
                            <option value="SAAO">SAAO</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            District
                        </label>
                        <input
                            type="text"
                            list="district-list"
                            placeholder="Type to search district..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent text-sm"
                        />
                        <datalist id="district-list">
                            <option value="Sylhet" />
                            <option value="Habiganj" />
                            <option value="Moulvibazar" />
                            <option value="Sunamganj" />
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upazila
                        </label>
                        <input
                            type="text"
                            list="upazila-list"
                            placeholder="Type to search upazila..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent text-sm"
                        />
                        <datalist id="upazila-list">
                            <option value="Sylhet Sadar" />
                            <option value="Baniachong" />
                            <option value="Moulvibazar Sadar" />
                            <option value="Dharmapasha" />
                        </datalist>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Showing <span className="font-semibold text-[#026666]">20</span> of{" "}
                    <span className="font-semibold text-[#026666]">36</span> responses
                </p>
            </div>

            {/* Table */}
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Respondent
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Marks
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Submitted
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {surveyResponses.map((res) => (
                            <tr
                                key={res.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                    {res.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-800">
                                        {res.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {res.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">
                                        <div className="font-medium">{res.district}</div>
                                        <div className="text-xs text-gray-600">{res.upazila}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                                    {res.marks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {res.submitted}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            View
                                        </button>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyResponses;
