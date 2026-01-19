import React, { useState } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const tabs = ["My Datasets", "Shared With Me", "Access Requests"];

const datasets = [
    {
        id: 1,
        name: "astrfg",
        experiment: "tagrtgte",
        dimensions: "24 × 2",
        season: "Aman 2925",
        pi: "erfer",
        coInvestigator: "ertgeqrg",
        sharedWith: [
            { name: "admin", role: "edit", color: "green" },
            { name: "faysal4699", role: "view", color: "green" },
            { name: "faysal36322", role: "edit", color: "green" },
        ],
        created: "12/27/2025",
    },
    {
        id: 2,
        name: "Faysal",
        experiment: "Ahmed",
        dimensions: "25 × 3",
        season: "Aus 2020",
        pi: "fay",
        coInvestigator: "sal",
        sharedWith: [
            { name: "faysal3632", role: "edit", color: "yellow" },
            { name: "faysal4699", role: "edit", color: "green" },
            { name: "faysal36322", role: "edit", color: "yellow" },
        ],
        created: "12/28/2025",
    },
];

const badgeColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
};

const ManageDatasets = () => {
    const [activeTab, setActiveTab] = useState("My Datasets");

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Dataset Management</h1>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${activeTab === tab
                                ? "bg-white text-gray-900 shadow"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Section title */}
            <h2 className="text-lg font-semibold flex items-center mb-4">
                <FaUser className="mr-2" />
                {activeTab} ({datasets.length})
            </h2>

            {/* Dataset Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.map((ds) => (
                    <div
                        key={ds.id}
                        className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
                    >
                        {/* Header */}
                        <div className="p-4 border-b">
                            <h4 className="font-semibold text-lg text-gray-800">
                                {ds.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                                Experiment: {ds.experiment}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="p-4 space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-gray-500">Dimensions</span>
                                    <p className="font-medium">{ds.dimensions}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Season</span>
                                    <p className="font-medium">{ds.season}</p>
                                </div>
                            </div>

                            <div>
                                <span className="text-gray-500">PI</span>
                                <p className="font-medium">{ds.pi}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">Co-Investigator</span>
                                <p className="font-medium">{ds.coInvestigator}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">Shared with</span>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {ds.sharedWith.map((user, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor[user.color]
                                                }`}
                                        >
                                            {user.name} ({user.role})
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-xs text-gray-400">
                                Created: {ds.created}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 rounded-b-lg">
                            <Link to={"/dataset/edit/3"}>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition">
                                    <FaEdit size={12} />
                                    Edit Dataset
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageDatasets;
