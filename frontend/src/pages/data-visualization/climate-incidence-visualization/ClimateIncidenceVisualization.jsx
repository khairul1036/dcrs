import React, { useState } from 'react';
import ClimateHazardMap from './ClimateHazardMap';
import Statistics from './Statistics';
import HazardAnalyticsDashboard from './HazardAnalyticsDashboard';

const ClimateIncidenceVisualization = () => {

    const [selectedDistrict, setSelectedDistrict] = useState('');

    return (
        <div>
            <Statistics />
            <ClimateHazardMap selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict} />
            <HazardAnalyticsDashboard selectedDistrict={selectedDistrict} />
        </div>
    );
};

export default ClimateIncidenceVisualization;