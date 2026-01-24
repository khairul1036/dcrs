import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ClimateHazardMap = () => {
    const svgRef = useRef(null);
    const [geoData, setGeoData] = useState(null);
    const [districtSummary, setDistrictSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const width = 800;
    const height = 900;

    useEffect(() => {
        fetch('/bangladesh.geojson')
            .then(r => {
                if (!r.ok) throw new Error('GeoJSON load failed');
                return r.json();
            })
            .then(data => {
                setGeoData(data);
                // console.log("GeoJSON loaded → sample district names:",
                //     data.features.slice(0, 5).map(f => f.properties.NAME_3 || f.properties.NAME_2));
            })
            .catch(err => setError(err.message));

        axios.get('https://dcrs.brri.gov.bd/api/climate-visualization/district-summary')
            .then(res => {
                if (res.data?.success && Array.isArray(res.data.data)) {
                    const obj = {};
                    res.data.data.forEach(item => {
                        const key = item.district.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                        obj[key] = item;
                    });
                    setDistrictSummary(obj);
                    // console.log("API districts loaded:", Object.keys(obj));
                }
            })
            .catch(err => setError('API error: ' + err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!geoData || !svgRef.current) return;

        const svg = d3.select(svgRef.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('background', '#f8fafc');

        svg.selectAll('*').remove();

        const projection = d3.geoMercator()
            .center([90.35, 23.68])
            .scale(4800)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // ───────────────────────────────────────────────
        //  Linear green scale: 0 → light green → very dark green
        // ───────────────────────────────────────────────
        const maxHazard = Math.max(...Object.values(districtSummary).map(d => d.hazardCount || 0), 1);

        const colorScale = d3.scaleLinear()
            .domain([0, maxHazard * 0.33, maxHazard * 0.66, maxHazard])
            .range([
                '#C0EBA0',      // very light green
                '#86efac',      // light-medium green
                '#22c55e',      // medium green
                '#15803d'       // dark forest green
            ])
            .clamp(true);

        const districts = svg.selectAll('path')
            .data(geoData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', d => {
                const rawName = d.properties.NAME_3 || '';
                const key = rawName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                const data = districtSummary[key] || {};
                const count = data.hazardCount || 0;

                // if (count === 0 && rawName) {
                //     console.log(`No match for district: "${rawName}" → key: "${key}"`);
                // }

                return colorScale(count);
            })
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 0.6)
            .style('cursor', 'pointer');

        // Zoom
        const zoom = d3.zoom()
            .scaleExtent([0.8, 8])
            .translateExtent([[-width, -height], [width * 2, height * 2]])
            .on('zoom', (event) => {
                districts.attr('transform', event.transform);
            });

        svg.call(zoom);

        // ───────────────────────────────────────────────
        //  Improved Tooltip – better position & styling
        // ───────────────────────────────────────────────
        districts
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 2.2);

                const geoName = d.properties.NAME_3 || 'Unknown';
                const key = geoName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
                const data = districtSummary[key] || {};

                let html = `
                    <div style="font-weight:700; font-size:15px; color:#14532d; margin-bottom:8px;">
                        ${data.displayName || geoName}
                    </div>`;

                if (data.hazardCount !== undefined) {
                    html += `
                        <div style="display:flex; justify-content:space-between; font-size:13.5px; margin:5px 0;">
                            <span>Hazard Count:</span>
                            <strong>${data.hazardCount}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13.5px;">
                            <span>Survey Count:</span>
                            <strong>${data.surveyCount || 0}</strong>
                        </div>`;
                } else {
                    html += '<div style="color:#6b7280; font-style:italic; margin-top:8px;">No data</div>';
                }

                const tooltip = d3.select('#tooltip');
                tooltip
                    .html(html)
                    .style('opacity', 1);

                // Use clientX/clientY for fixed positioning (cursor er kache show hobe)
                const tooltipWidth = tooltip.node().offsetWidth;
                const tooltipHeight = tooltip.node().offsetHeight;

                let left = event.clientX + 15; // cursor er 15px right e
                let top = event.clientY + 15;  // cursor er 15px niche

                // Prevent going off right edge - flip to left side of cursor
                if (left + tooltipWidth > window.innerWidth - 10) {
                    left = event.clientX - tooltipWidth - 15;
                }
                // Prevent going off bottom edge - flip to above cursor
                if (top + tooltipHeight > window.innerHeight - 10) {
                    top = event.clientY - tooltipHeight - 15;
                }
                // Prevent going off left edge
                if (left < 10) left = 10;
                // Prevent going off top edge
                if (top < 10) top = 10;

                tooltip
                    .style('left', left + 'px')
                    .style('top', top + 'px');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 0.6);

                d3.select('#tooltip').style('opacity', 0);
            });

    }, [geoData, districtSummary]);

    if (loading) return <div style={{ padding: '80px', textAlign: 'center', fontSize: '22px' }}>Loading map & data...</div>;
    if (error) return <div style={{ padding: '80px', textAlign: 'center', color: '#dc2626', fontSize: '20px' }}>Error: {error}</div>;

    return (
        <div style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '24px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#14532d',
                fontSize: '28px',
                fontWeight: 700
            }}>
                Bangladesh Climate Hazard Map
            </h2>

            <svg
                ref={svgRef}
                style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '750px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: '#f8fafc'
                }}
            />

            <div
                id="tooltip"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    background: 'rgba(255,255,255,0.96)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid #86efac',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    maxWidth: '300px',
                    fontFamily: 'system-ui, sans-serif',
                    zIndex: 9999,
                    opacity: 0,
                    transition: 'opacity 0.15s ease',
                }}
            />
        </div>
    );
};

export default ClimateHazardMap;