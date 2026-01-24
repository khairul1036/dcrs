// src/components/Statistics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [stats, setStats] = useState({
        totalSurveys: 0,
        uniqueDistricts: 0,
        hazardsTracked: 0,
        yearRange: 'N/A',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://dcrs.brri.gov.bd/api/climate-visualization/statistics')
            .then(response => {
                if (response.data?.success && response.data?.data) {
                    setStats(response.data.data);
                } else {
                    setError('Invalid response format');
                }
            })
            .catch(err => {
                setError(err.message || 'Failed to load statistics');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="bg-linear-to-r from-[#026666] to-[#035555] rounded-lg sm:rounded-xl shadow-lg p-6 text-center text-white">
                Loading statistics...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-linear-to-r from-[#026666] to-[#035555] rounded-lg sm:rounded-xl shadow-lg p-6 text-center text-white">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="bg-linear-to-r from-[#026666] to-[#035555] rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 xl:p-8 mb-3 sm:mb-4 lg:mb-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
                <div className="p-1.5 sm:p-2 lg:p-3 bg-white/20 rounded-lg shrink-0">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-0.5 sm:mb-1 lg:mb-2 leading-tight">
                        Climate Incidence Survey Visualization
                    </h1>
                    <p className="text-white/90 text-[11px] sm:text-xs lg:text-sm xl:text-base leading-relaxed">
                        Analyze and visualize climate hazard data across regions and seasons
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {/* Total Surveys */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 border border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 lg:gap-3">
                        <div className="p-1 sm:p-1.5 lg:p-2 bg-white/20 rounded shrink-0">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"></path>
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-white/70 text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-wide truncate">
                                Total Surveys
                            </p>
                            <p className="text-white text-base sm:text-lg lg:text-xl font-bold">
                                {stats.totalSurveys}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hazards Tracked */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 border border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 lg:gap-3">
                        <div className="p-1 sm:p-1.5 lg:p-2 bg-white/20 rounded shrink-0">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-white/70 text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-wide truncate">
                                Hazards Tracked
                            </p>
                            <p className="text-white text-base sm:text-lg lg:text-xl font-bold">
                                {stats.hazardsTracked}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Year Range */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 border border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 lg:gap-3">
                        <div className="p-1 sm:p-1.5 lg:p-2 bg-white/20 rounded shrink-0">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 448 512"
                                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-white/70 text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-wide truncate">
                                Year Range
                            </p>
                            <p className="text-white text-base sm:text-lg lg:text-xl font-bold">
                                {stats.yearRange}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Districts Covered */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 border border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 lg:gap-3">
                        <div className="p-1 sm:p-1.5 lg:p-2 bg-white/20 rounded shrink-0">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"></path>
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-white/70 text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-wide truncate">
                                Districts Covered
                            </p>
                            <p className="text-white text-base sm:text-lg lg:text-xl font-bold">
                                {stats.uniqueDistricts}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;