// CropDamageReports.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';

const CropDamageReports = () => {
    const [reports, setReports] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReports = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                `https://dcrs.brri.gov.bd/api/climate-visualization/crop-damage-reports?page=${page}&limit=10`
            );

            if (res.data.success) {
                setReports(res.data.data || []);
                setPagination({
                    page: res.data.pagination.page,
                    limit: res.data.pagination.limit,
                    total: res.data.pagination.total,
                    totalPages: res.data.pagination.totalPages,
                });
            } else {
                setError('Failed to load crop damage reports');
            }
        } catch (err) {
            setError('Error fetching data. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports(1);
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        fetchReports(newPage);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxShow = 5;
        let start = Math.max(1, pagination.page - Math.floor(maxShow / 2));
        let end = Math.min(pagination.totalPages, start + maxShow - 1);

        if (end - start + 1 < maxShow) {
            start = Math.max(1, end - maxShow + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
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
            {/* Header */}
            <div className="bg-white rounded-t-xl shadow-lg border border-gray-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Crop Damage Reports</h2>
                            <p className="text-sm text-gray-500">
                                Showing {reports.length} of {pagination.total} total reports
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-lg border-x border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Respondent
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Year
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    District
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Hazard
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Crop
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Impact
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Adoption Practices
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.map((report, index) => (
                                <tr
                                    key={report.surveyId}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                                >
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="font-medium">{report.respondentName}</div>
                                        <div className="text-xs text-gray-500">{report.respondentType || '—'}</div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {report.year}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <div className="font-medium">{report.district}</div>
                                        <div className="text-xs text-gray-500">{report.upazila}</div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            {report.hazardName}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                            {report.cropName}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-700 max-w-xs">
                                        <div className="line-clamp-2" title={report.impact}>
                                            {report.impact || '—'}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-700 max-w-xs">
                                        <div className="line-clamp-2" title={report.adoptionPractices}>
                                            {report.adoptionPractices ? report.adoptionPractices : (
                                                <span className="text-gray-400 italic">No practices data</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-center">
                                        <button
                                            title="View Details"
                                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                                            onClick={() => {
                                                // TODO: Open modal or navigate to detail page with report.surveyId
                                                console.log('View report:', report.surveyId);
                                            }}
                                        >
                                            <FaEye className="w-4 h-4" />
                                            <span className="hidden sm:inline">View</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="bg-white shadow-lg border-x border-b border-gray-100 rounded-b-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                        <span className="font-medium">
                            {(pagination.page - 1) * pagination.limit + reports.length}
                        </span>{' '}
                        of <span className="font-medium">{pagination.total}</span> results
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => handlePageChange(pagination.page - 1)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${pagination.page === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 320 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
                            </svg>
                            Previous
                        </button>

                        <div className="hidden sm:flex items-center gap-2">
                            {getPageNumbers().map((pg) => (
                                <button
                                    key={pg}
                                    onClick={() => handlePageChange(pg)}
                                    className={`px-3 py-2 rounded-md transition-colors ${pg === pagination.page
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {pg}
                                </button>
                            ))}
                            {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                                <span className="px-2 text-gray-400">...</span>
                            )}
                        </div>

                        <div className="sm:hidden px-3 py-2 bg-gray-100 rounded-md text-sm">
                            Page {pagination.page} of {pagination.totalPages}
                        </div>

                        <button
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() => handlePageChange(pagination.page + 1)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${pagination.page === pagination.totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Next
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 320 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDamageReports;