// ClimateIncidenceSurvey.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaCheckCircle,
    FaArrowRight,
    FaSpinner,
} from 'react-icons/fa';

const ClimateIncidenceSurvey = () => {
    const [filters, setFilters] = useState({
        respondentType: '',
        year: '',
        hotspot: '',
        region: '',
        division: '',
        district: '',
        upazila: '',
        union: '',
        block: '',
        respondentName: '',
    });

    const [options, setOptions] = useState({
        respondentTypes: [],
        years: [],
        hotspots: [],
        regions: [],
        divisions: [],
        districts: [],
        upazilas: [],
        unions: [],
        blocks: [],
        respondentNames: [],
    });

    const [selectedHazards, setSelectedHazards] = useState([]);
    const [severityRatings, setSeverityRatings] = useState({}); // { hazard: { monthIndex: rating } }
    const [seasonSelections, setSeasonSelections] = useState({}); // { hazard: { aus: bool, aman: bool, boro: bool } }
    const [mostDangerous, setMostDangerous] = useState(null);
    const [dangerLevel, setDangerLevel] = useState(5);

    const [loading, setLoading] = useState({}); // { field: bool }
    const [hazards, setHazards] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);

    // API Base
    const API_BASE = 'https://dcrs.brri.gov.bd/api/climate-incidence';

    // Load initial options (non-dependent)
    useEffect(() => {
        const loadInitial = async () => {
            setLoading((prev) => ({ ...prev, respondentType: true }));
            try {
                const res = await axios.get(`${API_BASE}/respondent-types`);
                setOptions((prev) => ({ ...prev, respondentTypes: res.data.data || [] }));
            } catch (err) {
                console.error('Failed to load respondent types', err);
            } finally {
                setLoading((prev) => ({ ...prev, respondentType: false }));
            }

            setLoading((prev) => ({ ...prev, hazards: true }));
            try {
                const res = await axios.get(`${API_BASE}/hazards`);
                setHazards(res.data.data || []);
            } catch (err) {
                console.error('Failed to load hazards', err);
            } finally {
                setLoading((prev) => ({ ...prev, hazards: false }));
            }
        };
        loadInitial();
    }, []);

    // Chain loading for dependent fields
    const loadDependentOptions = async (field, dependentField, params = {}) => {
        if (!filters[field]) return;

        setLoading((prev) => ({ ...prev, [dependentField]: true }));
        try {
            const query = new URLSearchParams({ [field]: filters[field], ...params }).toString();
            const res = await axios.get(`${API_BASE}/${dependentField}s?${query}`);
            setOptions((prev) => ({ ...prev, [dependentField + 's']: res.data.data || [] }));
        } catch (err) {
            console.error(`Failed to load ${dependentField}s`, err);
        } finally {
            setLoading((prev) => ({ ...prev, [dependentField]: false }));
        }
    };

    useEffect(() => {
        if (filters.respondentType) loadDependentOptions('respondentType', 'year');
    }, [filters.respondentType]);

    useEffect(() => {
        if (filters.year) loadDependentOptions('year', 'hotspot');
    }, [filters.year]);

    useEffect(() => {
        if (filters.hotspot) loadDependentOptions('hotspot', 'region');
    }, [filters.hotspot]);

    useEffect(() => {
        if (filters.region) loadDependentOptions('region', 'division');
    }, [filters.region]);

    useEffect(() => {
        if (filters.division) loadDependentOptions('division', 'district');
    }, [filters.division]);

    useEffect(() => {
        if (filters.district) loadDependentOptions('district', 'upazila');
    }, [filters.district]);

    useEffect(() => {
        if (filters.upazila) loadDependentOptions('upazila', 'union');
    }, [filters.upazila]);

    useEffect(() => {
        if (filters.union) loadDependentOptions('union', 'block');
    }, [filters.union]);

    useEffect(() => {
        if (filters.block) {
            loadDependentOptions('block', 'respondentName', {
                respondentType: filters.respondentType,
                year: filters.year,
                // add other filters if needed
            });
        }
    }, [filters.block]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => {
            const newFilters = { ...prev, [name]: value };
            // Reset dependent fields
            const fields = ['respondentType', 'year', 'hotspot', 'region', 'division', 'district', 'upazila', 'union', 'block', 'respondentName'];
            const index = fields.indexOf(name);
            for (let i = index + 1; i < fields.length; i++) {
                newFilters[fields[i]] = '';
            }
            return newFilters;
        });
    };

    const handleLoadSurveyData = async () => {
        setLoading((prev) => ({ ...prev, surveys: true }));
        try {
            const params = new URLSearchParams(filters);
            const res = await axios.get(`${API_BASE}/surveys?${params.toString()}`);
            setFilteredSurveys(res.data.data || []);
        } catch (err) {
            console.error('Failed to load survey data', err);
        } finally {
            setLoading((prev) => ({ ...prev, surveys: false }));
        }
    };

    const toggleHazard = (hazardName) => {
        setSelectedHazards((prev) =>
            prev.includes(hazardName)
                ? prev.filter((h) => h !== hazardName)
                : [...prev, hazardName]
        );
    };

    const handleSeverityChange = (hazardName, monthIndex, value) => {
        setSeverityRatings((prev) => ({
            ...prev,
            [hazardName]: {
                ...prev[hazardName],
                [monthIndex]: Number(value),
            },
        }));
    };

    const handleSeasonChange = (hazardName, season, checked) => {
        setSeasonSelections((prev) => ({
            ...prev,
            [hazardName]: {
                ...prev[hazardName],
                [season.toLowerCase()]: checked,
            },
        }));
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seasons = ['Aus', 'Aman', 'Boro'];

    const handleSubmit = async () => {
        const payload = {
            filters,
            selectedHazards,
            severityRatings,
            seasonSelections,
            mostDangerous,
            dangerLevel,
        };

        try {
            await axios.post(`${API_BASE}/submit`, payload);
            alert('Survey submitted!');
        } catch (err) {
            alert('Submission failed');
        }
    };

    const isFieldEnabled = (field) => {
        const dependencies = {
            year: filters.respondentType,
            hotspot: filters.year,
            region: filters.hotspot,
            division: filters.region,
            district: filters.division,
            upazila: filters.district,
            union: filters.upazila,
            block: filters.union,
            respondentName: filters.block,
        };
        return dependencies[field] || false;
    };

    return (
        <div className="min-h-screen px-2 py-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#026666] to-[#035555] rounded-xl shadow-lg p-4 sm:p-6 mb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
                                <FaExclamationTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                                    Climate Incidence Survey
                                </h1>
                                <p className="text-white/90 text-xs sm:text-sm mt-1 leading-relaxed">
                                    Track and analyze climate-related incidents
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaMapMarkerAlt className="w-5 h-5 text-[#026666]" />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Survey Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        {/* Respondent Type */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Respondent Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="respondentType"
                                value={filters.respondentType}
                                onChange={handleFilterChange}
                                disabled={loading.respondentType}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Respondent Type</option>
                                {options.respondentTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('year') || loading.year}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Year</option>
                                {options.years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Hotspot */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hotspot <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="hotspot"
                                value={filters.hotspot}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('hotspot') || loading.hotspot}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Hotspot</option>
                                {options.hotspots.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Region */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Region <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="region"
                                value={filters.region}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('region') || loading.region}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Region</option>
                                {options.regions.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Division */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Division <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="division"
                                value={filters.division}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('division') || loading.division}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Division</option>
                                {options.divisions.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                District <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="district"
                                value={filters.district}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('district') || loading.district}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select District</option>
                                {options.districts.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upazila <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="upazila"
                                value={filters.upazila}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('upazila') || loading.upazila}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Upazila</option>
                                {options.upazilas.map((u) => (
                                    <option key={u} value={u}>
                                        {u}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Union */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Union <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="union"
                                value={filters.union}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('union') || loading.union}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Union</option>
                                {options.unions.map((u) => (
                                    <option key={u} value={u}>
                                        {u}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Block */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Block <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="block"
                                value={filters.block}
                                onChange={handleFilterChange}
                                disabled={!isFieldEnabled('block') || loading.block}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Block</option>
                                {options.blocks.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Respondent Name */}
                        <div className="lg:col-span-2 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Respondent Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                                <select
                                    name="respondentName"
                                    value={filters.respondentName}
                                    onChange={handleFilterChange}
                                    disabled={!isFieldEnabled('respondentName') || loading.respondentName}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#026666] focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">Select from list</option>
                                    {options.respondentNames.map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="text-sm text-gray-600">
                            <span className="text-red-500">*</span> All required fields must be filled
                        </div>
                        <button
                            onClick={handleLoadSurveyData}
                            disabled={loading.surveys || !filters.respondentName} // Example: Require all filled
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-[#026666] to-[#035555] text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading.surveys ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                            Load Survey Data
                        </button>
                    </div>

                    {/* Selected Filters */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Selected Filters:</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([key, val]) =>
                                val ? (
                                    <span
                                        key={key}
                                        className="px-3 py-1 bg-[#026666]/10 text-[#026666] rounded-full text-xs font-medium"
                                    >
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {val}
                                    </span>
                                ) : null
                            )}
                        </div>
                    </div>
                </div>


                {/* Major Hazard Selection */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 mb-6">
                    <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                                <FaExclamationTriangle className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Major Hazard</h3>
                                <p className="text-xs sm:text-sm text-gray-600 truncate">
                                    Select the major climate hazards in your selected location ({filters.district || '—'} -{' '}
                                    {filters.year || '—'})
                                </p>
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-[#026666] flex-shrink-0">
                            {selectedHazards.length} Selected
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {hazards.map((hazard) => (
                            <div
                                key={hazard.id}
                                onClick={() => toggleHazard(hazard.name)}
                                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedHazards.includes(hazard.name)
                                    ? 'border-[#026666] bg-[#026666]/5'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedHazards.includes(hazard.name)}
                                    readOnly
                                    className="w-4 h-4 text-[#026666] border-gray-300 rounded focus:ring-[#026666] cursor-pointer"
                                />
                                <label className="flex-1 text-sm font-medium text-gray-800 cursor-pointer">
                                    {hazard.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Selected Hazards:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedHazards.map((h) => (
                                <span
                                    key={h}
                                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium flex items-center gap-2"
                                >
                                    {h}
                                    <button onClick={() => toggleHazard(h)} className="hover:text-orange-900">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-[#026666] to-[#035555] text-white hover:shadow-lg hover:scale-105">
                            Continue to Next Step
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* Hazard Calendar - Severity Rating */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                            <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Hazard Calendar - Severity Rating</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Rate the severity of each hazard for each month
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                    0: None
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                                    1: Low
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                                    2: Moderate
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                                    3: High
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="sm:hidden space-y-6">
                        {selectedHazards.map((hazard) => (
                            <div key={hazard} className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-gray-800 break-words">{hazard}</p>
                                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                                        Monthly Severity
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {months.map((m, i) => (
                                        <div key={i} className="space-y-1">
                                            <span className="block text-[11px] font-semibold text-gray-500">{m}</span>
                                            <select
                                                value={severityRatings[hazard]?.[i] ?? 0}
                                                onChange={(e) => handleSeverityChange(hazard, i, e.target.value)}
                                                className="w-full rounded-md border border-gray-300 bg-white py-1 px-2 text-xs font-semibold text-gray-800 focus:border-[#026666] focus:outline-none focus:ring-2 focus:ring-[#026666]"
                                            >
                                                <option value="0">0 - None</option>
                                                <option value="1">1 - Low</option>
                                                <option value="2">2 - Moderate</option>
                                                <option value="3">3 - High</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-max divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#026666] to-[#035555]">
                                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white sticky left-0 bg-[#026666] z-10 min-w-[150px]">
                                        Hazard Name
                                    </th>
                                    {months.map((m) => (
                                        <th
                                            key={m}
                                            className="px-2 py-3 text-center text-xs sm:text-sm font-semibold text-white min-w-[70px]"
                                        >
                                            {m}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {selectedHazards.map((hazard) => (
                                    <tr key={hazard} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 text-xs sm:text-sm text-gray-800 font-medium sticky left-0 bg-white z-10 border-r border-gray-200">
                                            <span className="line-clamp-2 break-words">{hazard}</span>
                                        </td>
                                        {months.map((_, i) => (
                                            <td key={i} className="px-2 py-3 text-center">
                                                <select
                                                    value={severityRatings[hazard]?.[i] ?? 0}
                                                    onChange={(e) => handleSeverityChange(hazard, i, e.target.value)}
                                                    className="rounded border border-gray-300 py-1 px-2 text-xs font-medium focus:border-[#026666] focus:ring-[#026666]"
                                                >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Severity Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-3">Severity Summary:</p>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {selectedHazards.map((hazard) => (
                                <div key={hazard} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="font-semibold text-gray-800 text-sm mb-2">{hazard}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(severityRatings[hazard] || {}).map(([month, val]) =>
                                            val > 0 ? (
                                                <span
                                                    key={month}
                                                    className={`px-2 py-1 rounded text-xs font-medium ${val === 1
                                                        ? 'bg-green-100 text-green-700'
                                                        : val === 2
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {months[month]} ({val})
                                                </span>
                                            ) : null
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Season Selection */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                            <FaCheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Hazard by Season</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Select which rice growing seasons are affected by each hazard
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#026666] to-[#035555]">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[150px]">
                                        Hazard Name
                                    </th>
                                    {seasons.map((s) => (
                                        <th key={s} className="px-6 py-3 text-center text-sm font-semibold text-white min-w-[100px]">
                                            {s}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {selectedHazards.map((hazard) => (
                                    <tr key={hazard} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-800">{hazard}</td>
                                        {seasons.map((season) => (
                                            <td key={season} className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={seasonSelections[hazard]?.[season.toLowerCase()] || false}
                                                    onChange={(e) =>
                                                        handleSeasonChange(hazard, season.toLowerCase(), e.target.checked)
                                                    }
                                                    className="w-5 h-5 text-[#026666] border-gray-300 rounded focus:ring-[#026666]"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Season Selection Summary:</p>
                        <div className="space-y-2">
                            {selectedHazards.map((hazard) => {
                                const selectedSeasons = Object.entries(seasonSelections[hazard] || {})
                                    .filter(([_, v]) => v)
                                    .map(([s]) => s.charAt(0).toUpperCase() + s.slice(1));
                                return selectedSeasons.length > 0 ? (
                                    <div key={hazard} className="flex flex-col sm:flex-row sm:items-start gap-2 text-sm">
                                        <span className="font-semibold text-gray-700 sm:min-w-[120px]">{hazard}:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedSeasons.map((s) => (
                                                <span key={s} className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-green-800">
                            <span className="font-semibold">Rice Growing Seasons:</span>{' '}
                            <span className="block sm:inline sm:ml-1">
                                Aus (Apr-Aug), Aman (Jul-Dec), Boro (Dec-May)
                            </span>
                        </p>
                    </div>
                </div>

                {/* Most Dangerous Hazard */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                            <FaExclamationTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Most Dangerous Hazard</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Select the most dangerous climate hazard
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {selectedHazards.map((hazard) => (
                            <div
                                key={hazard}
                                onClick={() => setMostDangerous(hazard)}
                                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${mostDangerous === hazard
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    checked={mostDangerous === hazard}
                                    readOnly
                                    className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600 cursor-pointer"
                                />
                                <label className="flex-1 text-sm font-medium text-gray-800 cursor-pointer">
                                    {hazard}
                                </label>
                            </div>
                        ))}
                    </div>

                    {mostDangerous && (
                        <>
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-700 mb-3">
                                    Rate the Danger Level <span className="text-gray-500">(Optional)</span>
                                </p>
                                <p className="text-xs text-gray-600 mb-3">
                                    How dangerous is this hazard? (1 = Low Danger, 5 = Extreme Danger)
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setDangerLevel(level)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${dangerLevel === level
                                                ? level === 5
                                                    ? 'border-red-600 bg-red-50 shadow-md'
                                                    : 'border-orange-400 bg-orange-50'
                                                : 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-50'
                                                }`}
                                        >
                                            <FaExclamationTriangle
                                                className={`w-5 h-5 ${level >= 4 ? 'text-red-600' : 'text-gray-400'}`}
                                            />
                                            <span
                                                className={`text-sm font-semibold ${level >= 4 ? 'text-red-800' : 'text-gray-700'
                                                    }`}
                                            >
                                                {level}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-800">
                                        <span className="font-semibold">Danger Level: {dangerLevel}/5</span> -{' '}
                                        {dangerLevel === 5
                                            ? 'Extreme danger, catastrophic impact'
                                            : dangerLevel >= 3
                                                ? 'High danger, significant impact'
                                                : 'Moderate to low danger'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-xs sm:text-sm text-red-800">
                                    <span className="font-semibold">Important:</span> The most dangerous hazard is the one
                                    that causes the greatest economic loss and affects the largest area of rice
                                    cultivation.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Submit */}
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        onClick={handleSubmit}
                        className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto bg-gradient-to-r from-[#026666] to-[#035555] text-white hover:shadow-lg hover:scale-105"
                    >
                        <FaCheckCircle className="w-4 h-4" />
                        Submit Survey
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ClimateIncidenceSurvey;