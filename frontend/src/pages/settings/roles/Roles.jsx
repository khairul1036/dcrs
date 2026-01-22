/* eslint-disable no-unused-vars */
// src/pages/Roles.jsx  (or wherever it lives)
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import RoleModal from "./RoleModal";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

const Roles = () => {
    const axiosSecure = useAxiosSecure();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Fetch all roles
    const fetchRoles = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get("/role");
            setRoles(res.data?.data || res.data || []);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to load roles. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Create Role
    const handleAddRole = async (name) => {
        try {
            await axiosSecure.post("/role", { name });
            setAddModalOpen(false);
            Swal.fire({
                icon: "success",
                title: "Created!",
                text: "Role has been created successfully.",
                timer: 1500,
                showConfirmButton: false,
            });
            fetchRoles();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Create Failed",
                text: err.response?.data?.message || "Could not add role.",
            });
        }
    };

    // Update Role
    const handleUpdateRole = async (name) => {
        if (!selectedRole) return;
        try {
            await axiosSecure.put(`/role/${selectedRole.id}`, { name });
            setEditModalOpen(false);
            setSelectedRole(null);
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Role updated successfully.",
                timer: 1500,
                showConfirmButton: false,
            });
            fetchRoles();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: err.response?.data?.message || "Could not update role.",
            });
        }
    };

    // Delete Role with Confirmation
    const handleDeleteRole = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/role/${id}`);
                    Swal.fire("Deleted!", "Role has been deleted.", "success");
                    fetchRoles();
                } catch (err) {
                    Swal.fire("Error!", "Failed to delete role.", "error");
                }
            }
        });
    };

    const openEditModal = (role) => {
        setSelectedRole(role);
        setEditModalOpen(true);
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <div className="p-4 flex-1 min-h-screen bg-gray-50">
            <div className="p-3 sm:p-4 md:p-6 w-full max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                        Role Management
                    </h1>
                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="w-full sm:w-auto bg-slate-600 text-white px-4 sm:px-6 py-2 rounded shadow hover:shadow-lg transition duration-300 text-sm sm:text-base"
                    >
                        Add Role
                    </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-600 text-white">
                            <tr>
                                <th className="border-b px-4 md:px-6 py-3 text-left text-sm">#</th>
                                <th className="border-b px-4 md:px-6 py-3 text-left text-sm">Name</th>
                                <th className="border-b px-4 md:px-6 py-3 text-left text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr key={role.id} className="hover:bg-gray-100">
                                    <td className="border-b px-4 md:px-6 py-3 text-sm">{index + 1}</td>
                                    <td className="border-b px-4 md:px-6 py-3 text-sm font-medium">{role.name}</td>
                                    <td className="border-b px-4 md:px-6 py-3 flex gap-4">
                                        <button
                                            onClick={() => openEditModal(role)}
                                            disabled={role.name === "admin" || role.name === "user"}
                                            className={`p-1 ${role.name === "admin" || role.name === "user"
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-slate-600 hover:text-slate-800"
                                                }`}
                                            title={role.name === "admin" || role.name === "user" ? "System Role (Locked)" : "Edit"}
                                        >
                                            <FaEdit className="w-6 h-6" />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteRole(role.id)}
                                            disabled={role.name === "admin" || role.name === "user"}
                                            className={`p-1 ${role.name === "admin" || role.name === "user"
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-red-600 hover:text-red-800"
                                                }`}
                                            title={role.name === "admin" || role.name === "user" ? "System Role (Locked)" : "Delete"}
                                        >
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
                    {roles.map((role, index) => (
                        <div
                            key={role.id}
                            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm">#{index + 1}</span>
                                <span className="font-medium text-gray-900">{role.name}</span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => openEditModal(role)}
                                    disabled={role.name === "admin" || role.name === "user"}
                                    className={`p-1 ${role.name === "admin" || role.name === "user"
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-slate-600 hover:text-slate-800"
                                        }`}
                                    title={role.name === "admin" || role.name === "user" ? "System Role (Locked)" : "Edit"}
                                >
                                    <FaEdit className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={() => handleDeleteRole(role.id)}
                                    disabled={role.name === "admin" || role.name === "user"}
                                    className={`p-1 ${role.name === "admin" || role.name === "user"
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-red-600 hover:text-red-800"
                                        }`}
                                    title={role.name === "admin" || role.name === "user" ? "System Role (Locked)" : "Delete"}
                                >
                                    <MdDelete className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Modal */}
                <RoleModal
                    isOpen={addModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onSave={handleAddRole}
                    title="Add New Role"
                />

                {/* Edit Modal */}
                <RoleModal
                    isOpen={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedRole(null);
                    }}
                    onSave={handleUpdateRole}
                    initialValue={selectedRole?.name || ""}
                    title="Edit Role"
                    isEdit
                />
            </div>
        </div>
    );
};

export default Roles;