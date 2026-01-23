import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const RolePermission = () => {
    const axiosSecure = useAxiosSecure();

    const [roles, setRoles] = useState([]);
    const [allPermissions, setAllPermissions] = useState([]);

    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const [loadingRoles, setLoadingRoles] = useState(true);
    const [loadingPermissionsList, setLoadingPermissionsList] = useState(true);
    const [loadingRolePerms, setLoadingRolePerms] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // ────────────────────────────────────────────────
    //  Fetch all roles + all possible permissions (once)
    // ────────────────────────────────────────────────
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoadingRoles(true);
                setLoadingPermissionsList(true);

                const [rolesRes, permsRes] = await Promise.all([
                    axiosSecure.get("/role"),
                    axiosSecure.get("/role-permissions"),     // ← change to your actual endpoint if different
                ]);

                setRoles(rolesRes.data || []);

                // Assuming backend returns array of strings or {name: "..."}
                const permsData = permsRes.data;
                const permissionList = Array.isArray(permsData)
                    ? permsData
                    : permsData?.permissions?.map(p => p.name || p.permission || p) || [];

                setAllPermissions(permissionList.sort()); // alphabetical sort for better UX

                if (rolesRes.data?.length > 0) {
                    setSelectedRoleId(rolesRes.data[0].id);
                }
            } catch (err) {
                console.error("Failed to load initial data", err);
                setError("Failed to load roles or permissions list");
            } finally {
                setLoadingRoles(false);
                setLoadingPermissionsList(false);
            }
        };

        fetchInitialData();
    }, [axiosSecure]);

    // ────────────────────────────────────────────────
    //  Fetch permissions of selected role
    // ────────────────────────────────────────────────
    const fetchRolePermissions = async (roleId) => {
        if (!roleId) {
            setSelectedPermissions([]);
            return;
        }

        try {
            setLoadingRolePerms(true);
            setError(null);

            const res = await axiosSecure.get(`/role-permissions/${roleId}/permissions`);

            const currentPerms = Array.isArray(res.data)
                ? res.data
                : res.data?.permissions || res.data?.data || [];

            setSelectedPermissions(currentPerms);
        } catch (err) {
            console.error("Failed to load role permissions", err);
            setError("Could not load permissions for this role");
            setSelectedPermissions([]);
        } finally {
            setLoadingRolePerms(false);
        }
    };

    useEffect(() => {
        fetchRolePermissions(selectedRoleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoleId]);

    // ────────────────────────────────────────────────
    //  Handlers
    // ────────────────────────────────────────────────
    const handleCheckboxChange = (perm) => {
        setSelectedPermissions(prev =>
            prev.includes(perm)
                ? prev.filter(p => p !== perm)
                : [...prev, perm]
        );
    };

    const handleSave = async () => {
        if (!selectedRoleId || saving) return;

        try {
            setSaving(true);
            setError(null);

            console.log(selectedPermissions)

            await axiosSecure.put(`/role-permissions/${selectedRoleId}/permissions`, {
                permissions: selectedPermissions,
            });

            // Immediately refresh the displayed permissions from DB
            await fetchRolePermissions(selectedRoleId);

            // Optional: success feedback
            // You can replace alert with toast notification library
            alert("Permissions updated successfully!");
        } catch (err) {
            console.error("Save failed", err);
            setError(
                err.response?.data?.message ||
                "Failed to update permissions. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    // ────────────────────────────────────────────────
    //  Render
    // ────────────────────────────────────────────────
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
                                    onChange={(e) => setSelectedRoleId(e.target.value)}
                                    disabled={loadingRoles || roles.length === 0}
                                    className="border border-gray-300 rounded-lg px-4 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                >
                                    <option value="">-- Choose a role --</option>
                                    {roles?.data?.map(role => (
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
                                        : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
                                    }
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

                    {/* Permissions grid */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Available Permissions
                        </h2>

                        {loadingPermissionsList ? (
                            <div className="text-gray-500 py-8 text-center">
                                Loading all permissions...
                            </div>
                        ) : loadingRolePerms ? (
                            <div className="text-gray-500 py-8 text-center">
                                Loading role permissions...
                            </div>
                        ) : !selectedRoleId ? (
                            <div className="text-gray-500 italic py-8 text-center">
                                Please select a role to view and edit permissions
                            </div>
                        ) : allPermissions.length === 0 ? (
                            <div className="text-gray-500 py-8 text-center">
                                No permissions available
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[65vh] overflow-y-auto pr-2">
                                {allPermissions.map(perm => (
                                    <label
                                        key={perm}
                                        className={`
                                            flex items-center space-x-3 p-3 rounded-lg border
                                            transition cursor-pointer
                                            ${selectedPermissions.includes(perm)
                                                ? "bg-teal-50 border-teal-200"
                                                : "hover:bg-gray-50 border-gray-200"
                                            }
                                        `}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissions.includes(perm)}
                                            onChange={() => handleCheckboxChange(perm)}
                                            disabled={saving || loadingRolePerms}
                                            className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                        />
                                        <span className="text-sm text-gray-700">{perm}</span>
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