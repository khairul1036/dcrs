import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { ErrorAlert, SuccessAlert } from "../../../components/swal/swalAlert";

const RolePermission = () => {
    const axiosSecure = useAxiosSecure();

    const [roles, setRoles] = useState([]);
    const [allPermissions, setAllPermissions] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [loadingPermissionsList, setLoadingPermissionsList] = useState(true);
    const [loadingRolePerms, setLoadingRolePerms] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Fetch roles + all permissions once
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoadingRoles(true);
                setLoadingPermissionsList(true);

                const [rolesRes, permsRes] = await Promise.all([
                    axiosSecure.get("/role"),
                    axiosSecure.get("/role-permissions"),
                ]);

                // Fix: roles is array directly (removed .data bug)
                const rolesData = rolesRes.data || [];
                setRoles(rolesData.data);

                // Handle permission objects [{id, name}]
                let permsList = [];
                if (Array.isArray(permsRes.data)) {
                    permsList = permsRes.data;
                } else if (Array.isArray(permsRes.data?.data)) {
                    permsList = permsRes.data.data;
                } else if (permsRes.data?.permissions) {
                    permsList = permsRes.data.permissions;
                }

                // Keep as objects with id + name
                const permissionObjects = permsList.map(p => ({
                    id: p.id || p.permission_id,
                    name: p.name || p.permission || p.title || String(p)
                })).filter(p => p.id && p.name);

                setAllPermissions(permissionObjects.sort((a, b) => a.name.localeCompare(b.name)));

                if (rolesData.length > 0) {
                    setSelectedRoleId(rolesData[0].id);
                }
            } catch (err) {
                console.error("Initial data load failed", err);
                setError("Failed to load roles or permissions list");
            } finally {
                setLoadingRoles(false);
                setLoadingPermissionsList(false);
            }
        };

        fetchInitialData();
    }, [axiosSecure]);

    // Fetch current permission IDs of selected role
    const fetchRolePermissions = async (roleId) => {
        if (!roleId) {
            setSelectedPermissionIds([]);
            return;
        }

        try {
            setLoadingRolePerms(true);
            setError(null);

            const res = await axiosSecure.get(`/role-permissions/${roleId}/permissions`);

            // Extract permission IDs from response
            let permIds = [];
            if (Array.isArray(res.data)) {
                permIds = res.data.map(p => p.id).filter(Boolean);
            } else if (res.data?.permissionIds) {
                permIds = res.data.permissionIds;
            } else if (res.data?.permissions) {
                permIds = res.data.permissions.map(p => p.id || p.permission_id).filter(Boolean);
            }

            setSelectedPermissionIds(permIds.map(Number)); // ensure numbers
        } catch (err) {
            console.error("Failed to load role permissions:", err);
            setError("Could not load permissions for this role");
            setSelectedPermissionIds([]);
        } finally {
            setLoadingRolePerms(false);
        }
    };

    useEffect(() => {
        fetchRolePermissions(selectedRoleId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoleId]);

    const handleCheckboxChange = (permId) => {
        setSelectedPermissionIds(prev =>
            prev.includes(permId)
                ? prev.filter(id => id !== permId)
                : [...prev, permId]
        );
    };

    const handleSave = async () => {
        if (!selectedRoleId || saving) return;

        try {
            setSaving(true);
            setError(null);

            // FIXED: Now sending permissionIds (array of numbers)
            await axiosSecure.put(`/role-permissions/${selectedRoleId}/permissions`, {
                permissionIds: selectedPermissionIds,
            });

            // Refresh from database
            await fetchRolePermissions(selectedRoleId);

            await SuccessAlert({
                text: "Permissions updated successfully.",
            });

        } catch (err) {
            console.error("Save failed", err);
            const errorMsg = err.response?.data?.message || "Failed to update permissions";

            await ErrorAlert({
                text: errorMsg,
            });

            setError(errorMsg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 flex-1 min-h-screen bg-gray-50">
            <div className="p-3 sm:p-4 md:p-6 max-w-5xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-5 sm:p-6 md:p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">
                        Role Permissions Management
                    </h1>

                    {/* Role selector + Save */}
                    <div className="mb-8">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Role
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {loadingRoles ? (
                                <div className="text-gray-500">Loading roles...</div>
                            ) : (
                                <select
                                    id="role"
                                    value={selectedRoleId}
                                    onChange={e => setSelectedRoleId(e.target.value)}
                                    disabled={loadingRoles || roles.length === 0}
                                    className="border border-gray-300 rounded-lg px-4 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                >
                                    <option value="">-- Choose a role --</option>
                                    {roles?.map(role => (  // FIXED: roles.map (not roles.data)
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <button
                                onClick={handleSave}
                                disabled={saving || !selectedRoleId || loadingRolePerms}
                                className={`
                                    px-6 py-2.5 rounded-lg font-medium text-white transition
                                    ${saving || !selectedRoleId || loadingRolePerms
                                        ? "bg-teal-400 cursor-not-allowed"
                                        : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"}
                                `}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Permissions */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Available Permissions
                        </h2>

                        {loadingPermissionsList ? (
                            <div className="text-gray-500 py-8 text-center">Loading all permissions...</div>
                        ) : loadingRolePerms ? (
                            <div className="text-gray-500 py-8 text-center">Loading role permissions...</div>
                        ) : !selectedRoleId ? (
                            <div className="text-gray-500 italic py-8 text-center">
                                Please select a role to view and edit permissions
                            </div>
                        ) : allPermissions.length === 0 ? (
                            <div className="text-gray-500 py-8 text-center">No permissions available</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[65vh] overflow-y-auto pr-2">
                                {allPermissions.map(perm => (
                                    <label
                                        key={perm.id}  // ✅ Use perm.id as key
                                        className={`
                                            flex items-center space-x-3 p-3 rounded-lg border transition cursor-pointer
                                            ${selectedPermissionIds.includes(perm.id)
                                                ? "bg-teal-50 border-teal-200"
                                                : "hover:bg-gray-50 border-gray-200"}
                                        `}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissionIds.includes(perm.id)}  // ✅ Check by ID
                                            onChange={() => handleCheckboxChange(perm.id)}    // ✅ Toggle by ID
                                            disabled={saving || loadingRolePerms}
                                            className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                        />
                                        <span className="text-sm text-gray-700">{perm.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolePermission;