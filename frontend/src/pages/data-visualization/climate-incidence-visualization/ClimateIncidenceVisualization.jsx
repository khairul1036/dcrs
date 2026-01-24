import React, { useState } from 'react';
import ClimateHazardMap from './ClimateHazardMap';
import Statistics from './Statistics';
import HazardAnalyticsDashboard from './HazardAnalyticsDashboard';
import ClimateIncidentSurveys from './ClimateIncidentSurveys';
import CropDamageReports from './CropDamageReports';

const ClimateIncidenceVisualization = () => {

    const [selectedDistrict, setSelectedDistrict] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
            {/* Top section - Statistics */}
            <div className="mb-6 md:mb-8">
                <Statistics />
            </div>

            {/* Side-by-side layout for map + dashboard */}
            <div className="flex flex-col lg:flex-row gap-5">
                {/* Map */}
                <div className="w-full lg:w-1/2 h-auto">
                    <ClimateHazardMap
                        selectedDistrict={selectedDistrict}
                        setSelectedDistrict={setSelectedDistrict}
                    />
                </div>

                {/* Analytics Dashboard */}
                <div className="w-full lg:w-1/2 h-auto">
                    <HazardAnalyticsDashboard selectedDistrict={selectedDistrict} />
                </div>
            </div>

            <ClimateIncidentSurveys />
            <CropDamageReports />

        </div>
    );
};

export default ClimateIncidenceVisualization;