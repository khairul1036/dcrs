/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";

const CreateDataset = () => {
    const [users, setUsers] = useState([]);

    return (
        <div className="p-6 flex-1 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Custom Dataset Creator</h2>

                {/* Basic Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Basic Dataset Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">
                                Dataset Name *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter dataset name"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Experiment Name *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter experiment name"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="mt-4 max-w-sm">
                        <label className="block font-medium mb-1">
                            Number of Rows
                        </label>
                        <input
                            type="number"
                            min={1}
                            placeholder="Enter number of rows"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                {/* Experiment Details */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Experiment Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1">
                                Season *
                            </label>
                            <select className="w-full border p-2 rounded">
                                <option value="">Select Season</option>
                                <option>Aus</option>
                                <option>Aman</option>
                                <option>Boro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Year *
                            </label>
                            <input
                                type="number"
                                min={2000}
                                max={2036}
                                placeholder="Enter year"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1">
                                Principal Investigator (PI) *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter PI name"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Co-Investigator (CE)
                            </label>
                            <input
                                type="text"
                                placeholder="Optional"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <label className="block font-medium mb-1">
                            Number of Factors *
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={20}
                            placeholder="Enter number of factors"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                {/* Owner */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                        Owner Information
                    </h3>
                    <div>
                        <label className="block font-medium mb-1">Owner</label>
                        <div className="border bg-white p-2 rounded">
                            admin
                        </div>
                    </div>
                </div>

                {/* Permitted Users */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-2">
                        Permitted Users
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        💡 Selected users will receive email notifications.
                    </p>

                    <div className="bg-white border p-4 rounded mb-4">
                        <h4 className="font-medium mb-3">Add New User</h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <select className="border p-2 rounded">
                                <option>Select a user</option>
                                <option>admin</option>
                                <option>faysal36322</option>
                                <option>niaz.sust@gmail.com</option>
                            </select>

                            <input
                                type="date"
                                className="border p-2 rounded"
                            />

                            <select className="border p-2 rounded">
                                <option value="view">View Only</option>
                                <option value="edit">Edit</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            className="mt-3 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            <FaPlus /> Add User
                        </button>
                    </div>

                    {users.length === 0 && (
                        <p className="text-sm text-gray-500 italic bg-white p-3 border rounded">
                            No users added yet
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                        Generate Table
                    </button>

                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
                        <FaSave /> Save Dataset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDataset;
