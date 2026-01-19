import React from "react";
import { FaPlus, FaSearch, FaDatabase, FaShareAlt, FaClock, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const datasets = [
    {
        id: 1,
        name: "Faysal",
        experiment: "Ahmed",
        description: "Aus 2020",
        pi: "fay",
        rows: 25,
        cols: 3,
        shared: 3,
        created: "12/28/2025",
    },
    {
        id: 2,
        name: "astrfg",
        experiment: "tagrtgte",
        description: "Aman 2925",
        pi: "erfer",
        rows: 24,
        cols: 2,
        shared: 3,
        created: "12/27/2025",
    },
];

const ExploreDatasets = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Datasets</h1>
                    <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                        <FaPlus />
                        Create New Dataset
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your datasets..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Stats */}
                <div className="flex justify-between mb-4 text-sm text-gray-600">
                    <span>Showing {datasets.length} of {datasets.length} datasets</span>
                    <span>Total shared with: 6 users</span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {datasets.map((ds) => (
                        <div
                            key={ds.id}
                            className="bg-white border rounded-lg shadow hover:shadow-lg transition"
                        >
                            <div className="p-6">

                                {/* Title */}
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-lg truncate">{ds.name}</h3>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        Owner
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="mb-3 text-sm text-gray-600">
                                    <p><strong>Experiment:</strong> {ds.experiment}</p>
                                    <p className="text-gray-500">{ds.description}</p>
                                    <p><strong>PI:</strong> {ds.pi}</p>
                                </div>

                                {/* Meta */}
                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                    <p className="flex items-center gap-2">
                                        <FaDatabase /> {ds.rows} rows × {ds.cols} columns
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaShareAlt /> Shared with {ds.shared} users
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-500">
                                        <FaClock /> Created: {ds.created}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-2">
                                    <Link to={"/dataset/edit/3"}>
                                        <button className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded">
                                            <FaEdit /> Edit
                                        </button>
                                    </Link>
                                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded">
                                        <FaShareAlt /> Share
                                    </button>
                                    <button className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded">
                                        <FaTrash /> Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ExploreDatasets;
