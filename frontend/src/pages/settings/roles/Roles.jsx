import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Roles = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const roles = [
        { id: 1, name: "dev" },
        { id: 2, name: "SAAO" },
        { id: 3, name: "testing" },
    ];

    return (
        <div className="p-4 flex-1 min-h-screen bg-gray-50">
            <div className="p-3 sm:p-4 md:p-6 w-full max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                        Role Management
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto bg-slate-600 text-white px-4 sm:px-6 py-2 rounded shadow hover:shadow-lg transition duration-300 text-sm sm:text-base"
                    >
                        Add Role
                    </button>
                </div>

                {/* Table for Desktop */}
                <div className="hidden sm:block bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-600 text-white">
                            <tr>
                                <th className="border-b px-4 md:px-6 py-3 text-left text-sm">
                                    #
                                </th>
                                <th className="border-b px-4 md:px-6 py-3 text-left text-sm">
                                    Name
                                </th>
                                <th className="border-b px-4 md:px-6 py-3 text-left text-sm">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-100">
                                    <td className="border-b px-4 md:px-6 py-3 text-sm">{role.id}</td>
                                    <td className="border-b px-4 md:px-6 py-3 text-sm">{role.name}</td>
                                    <td className="border-b px-4 md:px-6 py-3 flex gap-3 sm:gap-4">
                                        <button className="text-slate-600 hover:text-slate-800 p-1">
                                            {/* Edit Icon */}
                                            <FaEdit className="w-6 h-6" />

                                        </button>
                                        <button className="text-red-600 hover:text-red-800 p-1">
                                            {/* Delete Icon */}
                                            <MdDelete className="w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm">#{role.id}</span>
                                <span className="font-medium text-gray-900">{role.name}</span>
                            </div>
                            <div className="flex gap-3">
                                <button className="text-slate-600 hover:text-slate-800 p-2">
                                    {/* Edit Icon */}
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 512 512"
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
                                    </svg>
                                </button>
                                <button className="text-red-600 hover:text-red-800 p-2">
                                    {/* Delete Icon */}
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
                        <input
                            type="text"
                            placeholder="Role Name"
                            className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                                Save
                            </button>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roles;
