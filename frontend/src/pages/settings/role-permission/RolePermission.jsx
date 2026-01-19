import React from "react";

const RolePermission = () => {
    const roles = [
        { id: 2, name: "dev" },
        { id: 4, name: "SAAO" },
        { id: 6, name: "testing" },
    ];

    const permissions = [
        "Roles",
        "Permissions",
        "User List",
        "User Approval",
        "User Edit",
        "User Delete",
        "Dataset Create",
        "Dataset Delete",
        "Dataset View",
        "Dataset Edit",
        "Dataset Share",
        "Data Access Requests",
        "Data Access Approve",
        "Data Access Reject",
        "Survey Create",
        "Survey Edit",
        "Survey Delete",
        "Survey View",
        "Survey Submit",
        "Survey Responses",
        "Growth Stage Add",
        "Growth Stage Edit",
        "Growth Stage Delete",
        "Disease Survey Add",
        "Disease Survey Edit",
        "Disease Survey Delete",
        "Insect Survey Add",
        "Insect Survey Edit",
        "Insect Survey Delete",
        "Questionnaire Survey Add",
        "Questionnaire Survey Edit",
        "Questionnaire Survey Delete",
        "Add Data",
        "View Data",
        "Edit Data",
        "Delete Data",
        "Export Data",
        "Import Data",
        "Secondary Source View",
        "Secondary Source Request",
        "Climate Visualization",
        "Reports",
        "Settings",
        "Change Password",
        "Change Role",
        "Profile",
    ];

    return (
        <div className="p-4 flex-1 min-h-screen bg-gray-50">
            <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">
                        Set Role Permission
                    </h1>

                    {/* Role Select + Save Button */}
                    <div className="mb-6">
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Role
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <select
                                id="role"
                                className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                            >
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            <button className="w-full sm:w-auto bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap transition">
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Permissions Grid */}
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold mb-3">
                            Set Permissions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-h-[60vh] sm:max-h-125 overflow-y-auto p-2 sm:p-0">
                            {permissions.map((perm, index) => (
                                <label
                                    key={index}
                                    className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 rounded cursor-pointer border border-gray-100 sm:border-0 transition"
                                >
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-zinc-600 shrink-0"
                                        defaultChecked={["Survey View", "Survey Submit", "Growth Stage Add", "Disease Survey Add", "Insect Survey Add", "Settings", "Change Password", "Profile"].includes(
                                            perm
                                        )}
                                    />
                                    <span className="text-sm sm:text-base">{perm}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolePermission;
