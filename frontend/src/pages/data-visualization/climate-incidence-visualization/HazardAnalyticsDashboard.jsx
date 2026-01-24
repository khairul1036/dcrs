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

    if (!selectedDistrict) {
        return (
            <div className="min-h-100 flex flex-col items-center justify-center text-center p-8 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-inner">
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
            <div className="min-h-100 flex items-center justify-center">
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
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-blue-600 text-3xl">📍</span>
                        Hazard Analytics: {data.district}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Based on {data.surveyCount || '?'} survey responses
                    </p>
                </div>
            </div>

            {/* Hazard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.map((hazard) => (
                    <div
                        key={hazard.hazardName}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Card Header */}
                        <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">{hazard.hazardName}</h2>
                        </div>

                        {/* Active Months */}
                        <div className="p-5 border-b">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Months</h3>
                            <div className="flex flex-wrap gap-2">
                                {months.map((m, i) => {
                                    const monthNum = i + 1;
                                    const isActive = hazard.activeMonths.includes(monthNum);
                                    return (
                                        <div
                                            key={m}
                                            className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${isActive
                                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                                : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            {m}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Frequency & Severity */}
                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Frequency & Severity</h3>

                            <div className="space-y-4">
                                {months.map((m, i) => {
                                    const monthNum = (i + 1).toString();
                                    const freq = hazard.monthlyFrequency[monthNum] || 0;
                                    const sev = hazard.monthlySeverity[monthNum];
                                    const avgSev = sev ? Math.round(sev.avgSeverity * 10) / 10 : 0;

                                    return (
                                        <div key={m} className="flex items-center gap-4">
                                            <span className="w-12 text-right font-medium text-gray-600">{m}</span>

                                            {/* Frequency Bar */}
                                            <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className="bg-indigo-500 h-full rounded-full transition-all"
                                                    style={{ width: `${Math.min(freq * 10, 100)}%` }}
                                                />
                                            </div>

                                            <span className="w-10 text-right text-sm font-medium">{freq}</span>

                                            {avgSev > 0 && (
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avgSev <= 1.5
                                                        ? 'bg-green-500'
                                                        : avgSev <= 2.5
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                        }`}
                                                >
                                                    {avgSev}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HazardAnalyticsDashboard;