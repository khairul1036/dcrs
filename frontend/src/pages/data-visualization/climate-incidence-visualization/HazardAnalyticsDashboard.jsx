import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HazardAnalyticsDashboard = ({ selectedDistrict = '' }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://dcrs.brri.gov.bd/api/climate-visualization/hazard-analytics';

    useEffect(() => {
        if (!selectedDistrict) {
            setData(null);
            setError(null);
            return;
        }

        const fetchHazardData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BASE_URL}?district=${encodeURIComponent(selectedDistrict)}`);
                if (response.data.success) {
                    setData(response.data);
                } else {
                    setError('Data fetch unsuccessful');
                }
            } catch (err) {
                setError('Failed to load hazard analytics. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHazardData();
    }, [selectedDistrict]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // টেবিলের জন্য data prepare
    const tableData = data?.data?.map(hazard => {
        const row = { name: hazard.hazardName };
        months.forEach((_, i) => {
            const m = (i + 1).toString();
            const sev = hazard.monthlySeverity[m];
            row[m] = sev ? Math.round(sev.avgSeverity * 10) / 10 : '-';
        });
        return row;
    }) || [];

    // Severity color logic
    const getSeverityColor = (value) => {
        if (value === '-' || value === 0) return 'text-gray-400';
        if (value <= 1.5) return 'text-green-600 bg-green-50';
        if (value <= 2.5) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    // Stats calculation
    const totalHazards = data?.data?.length || 0;
    const surveyCount = data?.surveyCount || 0;

    if (!selectedDistrict) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-inner">
                <div className="text-6xl mb-4">🗺️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No District Selected</h2>
                <p className="text-gray-600 max-w-md">
                    Click on any district in the map above to view detailed hazard analytics and severity data
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-100 flex flex-col items-center justify-center text-red-600 text-center p-6">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-xl">{error}</p>
            </div>
        );
    }

    if (!data?.data?.length) {
        return (
            <div className="min-h-100 flex items-center justify-center text-gray-600 text-center p-8">
                <div className="text-5xl mb-4">ℹ️</div>
                <p className="text-xl">No hazard data available for {selectedDistrict}</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl p-4">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-blue-600 text-3xl">📍</span>
                    Hazard Analytics: {data.district}
                </h1>
                <p className="text-gray-600 mt-1">
                    Based on {surveyCount} survey responses
                </p>
            </div>

            {/* Monthly Average Severity Table */}
            <div className="mb-10 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="sticky left-0 z-10 bg-gray-100 px-6 py-4 text-left text-sm font-semibold text-gray-900 w-48 min-w-48">
                                Hazard Type
                            </th>
                            {months.map((month) => (
                                <th
                                    key={month}
                                    className="px-4 py-4 text-center text-sm font-semibold text-gray-900 w-20 min-w-20"
                                >
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {tableData.map((row) => (
                            <tr key={row.name} className="hover:bg-gray-50">
                                <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                    {row.name}
                                </td>
                                {months.map((_, i) => {
                                    const m = (i + 1).toString();
                                    const val = row[m];
                                    return (
                                        <td
                                            key={m}
                                            className={`px-4 py-4 text-center text-sm ${getSeverityColor(
                                                typeof val === 'number' ? val : 0
                                            )}`}
                                        >
                                            {val}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Total Hazards Tracked */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Hazards Tracked</h3>
                    <p className="text-4xl font-bold text-indigo-600">{totalHazards}</p>
                </div>

                {/* Survey Responses */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Survey Responses</h3>
                    <p className="text-4xl font-bold text-green-600">{surveyCount}</p>
                </div>

                {/* Severity Scale */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Severity Scale</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium">Low</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                            <span className="text-sm font-medium">Moderate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-500"></div>
                            <span className="text-sm font-medium">High</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HazardAnalyticsDashboard;