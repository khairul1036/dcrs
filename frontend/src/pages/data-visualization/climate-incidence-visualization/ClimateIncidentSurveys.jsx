// climate-incident-surveys.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FaEye,        // View
    FaEdit,       // Edit
    FaTrashAlt,   // Delete
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa';

const ClimateIncidentSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSurveys = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://dcrs.brri.gov.bd/api/climate-incident-surveys?page=${page}&limit=10`
            );

            if (response.data.success) {
                setSurveys(response.data.data || []);
                setPagination({
                    page: response.data.pagination.page,
                    limit: response.data.pagination.limit,
                    total: response.data.pagination.total,
                    totalPages: response.data.pagination.totalPages,
                });
            } else {
                setError('Failed to fetch surveys');
            }
        } catch (err) {
            setError('Error loading data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveys(1);
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchSurveys(newPage);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let start = Math.max(1, pagination.page - 2);
        let end = Math.min(pagination.totalPages, start + maxPagesToShow - 1);

        if (end - start + 1 < maxPagesToShow) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#026666]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-red-600 text-center p-6">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            {/* Header Section */}
            <div className="bg-white rounded-t-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-[#026666] to-[#035555] rounded-lg">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Survey Submissions</h2>
                            <p className="text-sm text-gray-500">
                                Showing {surveys.length} of {pagination.total} total submissions
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-lg border-x border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-[#026666] to-[#035555]">
                            <tr>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider min-w-[50px]">
                                    #
                                </th>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider min-w-[150px]">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 448 512"
                                            className="w-3 h-3 flex-shrink-0"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                                        </svg>
                                        <span className="hidden sm:inline">Respondent</span>
                                        <span className="sm:hidden">Name</span>
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider min-w-[120px]">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 384 512"
                                            className="w-3 h-3 flex-shrink-0"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                                        </svg>
                                        Location
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider min-w-[80px]">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 448 512"
                                            className="w-3 h-3 flex-shrink-0"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                        </svg>
                                        Year
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider min-w-[140px]">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 576 512"
                                            className="w-3 h-3 flex-shrink-0"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
                                        </svg>
                                        Hazards
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider min-w-[100px]">
                                    Submitted
                                </th>
                                <th className="px-3 sm:px-4 py-3 sm:py-4 text-center text-xs font-semibold text-white uppercase tracking-wider min-w-[90px]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {surveys.map((survey, index) => (
                                <tr key={survey.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 font-medium">
                                        {(pagination.page - 1) * pagination.limit + index + 1}
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                                {survey.respondentName}
                                            </span>
                                            <span className="text-[10px] sm:text-xs text-gray-500 truncate">
                                                {survey.respondentType || '—'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs sm:text-sm text-gray-900 truncate">
                                                {survey.division}
                                            </span>
                                            <span className="text-[10px] sm:text-xs text-gray-500 truncate">
                                                {survey.district}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                                        <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {survey.year}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {survey.selectedHazards?.slice(0, 2).map((h, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-red-100 text-red-800 rounded-full truncate max-w-[80px]"
                                                >
                                                    {h.name}
                                                </span>
                                            ))}
                                            {survey.selectedHazards?.length > 2 && (
                                                <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                    +{survey.selectedHazards.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                                        <span className="hidden sm:inline">
                                            {new Date(survey.submittedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span className="sm:hidden">
                                            {new Date(survey.submittedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-2 py-1 sm:py-1 whitespace-nowrap text-center">
                                        <div className="flex items-center gap-1 justify-center flex-wrap">
                                            <button
                                                title="View"
                                                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#026666] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#035555] transition-colors duration-200"
                                            >
                                                <FaEye className="w-3 h-3" />
                                            </button>
                                            <button
                                                title="Edit"
                                                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                            >
                                                <FaEdit className="w-3 h-3" />
                                            </button>
                                            <button
                                                title="Delete"
                                                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                                            >
                                                <FaTrashAlt className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Footer */}
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 px-3 sm:px-4 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm text-gray-600 order-1 sm:order-none">
                        Page <span className="font-semibold text-gray-900">{pagination.page}</span> of{' '}
                        <span className="font-semibold text-gray-900">{pagination.totalPages}</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 order-2 sm:order-none">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => handlePageChange(pagination.page - 1)}
                            className={`p-1.5 sm:p-2 rounded-lg border transition-colors duration-200 ${pagination.page === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                }`}
                        >
                            <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>

                        <div className="flex items-center gap-0.5 sm:gap-1">
                            {getPageNumbers().map((pg) => (
                                <button
                                    key={pg}
                                    onClick={() => handlePageChange(pg)}
                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${pg === pagination.page
                                            ? 'bg-gradient-to-r from-[#026666] to-[#035555] text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                        }`}
                                >
                                    {pg}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() => handlePageChange(pagination.page + 1)}
                            className={`p-1.5 sm:p-2 rounded-lg border transition-colors duration-200 ${pagination.page === pagination.totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                }`}
                        >
                            <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 order-3 sm:order-none">
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Go to:</span>
                        <input
                            type="number"
                            min="1"
                            max={pagination.totalPages}
                            value={pagination.page}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) handlePageChange(val);
                            }}
                            className="w-12 sm:w-16 px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#026666] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClimateIncidentSurveys;