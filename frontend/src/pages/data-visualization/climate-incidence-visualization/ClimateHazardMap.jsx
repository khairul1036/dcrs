import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const ClimateHazardMap = ({ selectedDistrict, setSelectedDistrict }) => {
    const axiosSecure = useAxiosSecure();
    const svgRef = useRef(null);
    const [geoData, setGeoData] = useState(null);
    const [districtSummary, setDistrictSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mapWidth = 620;
    const mapHeight = 720;

    useEffect(() => {
        // GeoJSON লোড
        fetch('/bangladesh.geojson')
            .then(r => {
                if (!r.ok) throw new Error('GeoJSON load failed');
                return r.json();
            })
            .then(setGeoData)
            .catch(err => setError(err.message));

        // District summary API
        axiosSecure.get('/climate-incident-surveys/district-summary')
            .then(res => {
                if (res.data?.success && Array.isArray(res.data.data)) {
                    const obj = {};
                    res.data.data.forEach(item => {
                        // normalized key for matching
                        const key = item.district.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                        obj[key] = {
                            ...item,
                            normalizedKey: key,
                            displayName: item.displayName || item.district
                        };
                    });
                    setDistrictSummary(obj);
                }
            })
            .catch(err => setError('API error: ' + err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!geoData || !svgRef.current) return;

        const svg = d3.select(svgRef.current)
            .attr('viewBox', `0 0 ${mapWidth} ${mapHeight}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('background', '#f8fafc');

        svg.selectAll('*').remove();

        const projection = d3.geoMercator()
            .center([90.35, 23.68])
            .scale(4800)
            .translate([mapWidth / 2, mapHeight / 2]);

        const path = d3.geoPath().projection(projection);

        // max hazard count for color scaling
        const maxHazard = Math.max(...Object.values(districtSummary).map(d => d.hazardCount || 0), 1);

        const colorScale = d3.scaleLinear()
            .domain([0, maxHazard * 0.33, maxHazard * 0.66, maxHazard])
            .range(['#C0EBA0', '#86efac', '#22c55e', '#15803d'])
            .clamp(true);

        const districts = svg.selectAll('path')
            .data(geoData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', d => {
                const geoName = d.properties.NAME_3 || d.properties.NAME_2 || d.properties.DISTRICT || '';
                const key = geoName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                const data = districtSummary[key] || {};
                return colorScale(data.hazardCount || 0);
            })
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 0.6)
            .style('cursor', 'pointer');

        // Zoom functionality
        const zoom = d3.zoom()
            .scaleExtent([0.8, 8])
            .translateExtent([[-mapWidth, -mapHeight], [mapWidth * 2, mapHeight * 2]])
            .on('zoom', (event) => {
                districts.attr('transform', event.transform);
            });

        svg.call(zoom);

        // Hover + Click
        districts
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 2.2);

                const geoName = d.properties.NAME_3 || d.properties.NAME_2 || d.properties.DISTRICT || 'Unknown';
                const key = geoName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                const data = districtSummary[key] || {};

                let html = `<div class="font-bold text-base text-green-900 mb-2">
                    ${data.displayName || geoName}
                </div>`;

                if (data.hazardCount !== undefined) {
                    html += `
                    <div class="flex justify-between text-sm mb-1">
                        <span>Hazard Count:</span><strong>${data.hazardCount}</strong>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span>Survey Count:</span><strong>${data.surveyCount || 0}</strong>
                    </div>`;
                } else {
                    html += '<div class="text-gray-500 italic mt-2">No data available</div>';
                }

                const tooltip = d3.select('#tooltip');
                tooltip.html(html)
                    .style('opacity', 1);

                // Tooltip position
                let left = event.clientX + 15;
                let top = event.clientY + 15;
                const tw = tooltip.node().offsetWidth;
                const th = tooltip.node().offsetHeight;

                if (left + tw > window.innerWidth - 10) left = event.clientX - tw - 15;
                if (top + th > window.innerHeight - 10) top = event.clientY - th - 15;
                if (left < 10) left = 10;
                if (top < 10) top = 10;

                tooltip.style('left', left + 'px').style('top', top + 'px');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 0.6);
                d3.select('#tooltip').style('opacity', 0);
            })
            // Click to select district
            .on('click', function (event, d) {
                const geoName = d.properties.NAME_3 || d.properties.NAME_2 || d.properties.DISTRICT || '';
                const key = geoName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                const data = districtSummary[key];

                if (data) {
                    // dropdown-এ যে value ব্যবহার করা হচ্ছে সেটাই পাঠাচ্ছি
                    setSelectedDistrict(data.displayName || data.district);
                } else {
                    console.warn('No matching data for:', geoName);
                    // optional: setSelectedDistrict(geoName); যদি fallback চান
                }
            });

    }, [geoData, districtSummary, setSelectedDistrict]);

    if (loading) return <div className="py-20 text-center text-xl font-medium">Loading map & data...</div>;
    if (error) return <div className="py-20 text-center text-red-600 text-xl">Error: {error}</div>;

    return (
        <div className="bg-gray-50">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">
                Climate Hazard Distribution Map
            </h2>

            {/* SVG Map */}
            <div className="flex-1">
                <svg
                    ref={svgRef}
                    width={mapWidth}
                    height={mapHeight}
                    className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
                />
            </div>

            {/* Controls - Dropdown */}
            <div className="w-full md:w-80">
                <label
                    htmlFor="district-select"
                    className="block text-lg font-semibold text-gray-800 mb-3"
                >
                    Select District:
                </label>

                <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm cursor-pointer"
                >
                    <option value="">-- Select a district to view analytics --</option>
                    {Object.values(districtSummary)
                        .sort((a, b) => (b.hazardCount || 0) - (a.hazardCount || 0))
                        .map(item => (
                            <option
                                key={item.district}
                                value={item.displayName || item.district}
                            >
                                {item.displayName || item.district} ({item.hazardCount} hazards)
                            </option>
                        ))}
                </select>

                {selectedDistrict && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-lg font-medium text-gray-800">
                            Currently viewing:
                        </p>
                        <p className="text-xl font-bold text-green-700 mt-1">
                            {selectedDistrict}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            {districtSummary[Object.keys(districtSummary).find(k =>
                                (districtSummary[k].displayName || districtSummary[k].district) === selectedDistrict
                            )]?.hazardCount || '?'} hazards reported
                        </p>
                    </div>
                )}

            </div>

            {/* Tooltip */}
            <div
                id="tooltip"
                className="fixed pointer-events-none bg-white/95 backdrop-blur-md border border-green-300 rounded-lg px-4 py-3 shadow-2xl max-w-xs text-sm z-1000 opacity-0 transition-opacity duration-150"
            />
        </div>
    );
};

export default ClimateHazardMap;