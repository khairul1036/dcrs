import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [formData, setFormData] = useState({
        name: user.user?.name,
        username: user.user?.username,
        email: user.user?.email,
        whatsapp: user.user?.whatsapp,
        designation: user.user?.designation,
        division: user.user?.division,
        hotspots: ["River", "Haor", "Coastal", "Barind"],
        region: user.user?.region,
        locationDivision: user.user?.locationDivision,
        district: user.user?.district,
        upazila: user.user?.upazila,
        unionName: user.user?.unionName,
        block: user.user?.block,
        latitude: user.user?.latitude,
        longitude: user.user?.longitude,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const removeHotspot = (hotspot) => {
        setFormData((prev) => ({
            ...prev,
            hotspots: prev.hotspots.filter((h) => h !== hotspot),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosSecure.put(`/user/profile`, formData);

            if (res.data) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Your information has been updated successfully.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error("Update Error:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.response?.data?.message || "Something went wrong while updating!",
            });
        }
    };

    return (
        <div className="p-4 flex-1">
            <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Personal Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            disabled
                                            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Username cannot be changed
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="text"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            placeholder="Enter WhatsApp number"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Work Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Work Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            placeholder="Enter your designation"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Division/Department
                                        </label>
                                        <input
                                            type="text"
                                            name="division"
                                            value={formData.division}
                                            onChange={handleChange}
                                            placeholder="Enter your division"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Location Information
                                </h4>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Hotspot (Select multiple)
                                    </label>
                                    <div className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white min-h-12 flex items-center flex-wrap gap-1">
                                        {formData.hotspots.map((hotspot) => (
                                            <span
                                                key={hotspot}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                {hotspot}
                                                <button
                                                    type="button"
                                                    onClick={() => removeHotspot(hotspot)}
                                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Select dropdowns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Region
                                        </label>
                                        <select
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Region</option>
                                            <option value="Barishal">Barishal</option>
                                            <option value="Bogura">Bogura</option>
                                            <option value="Chattogram">Chattogram</option>
                                            <option value="Cumilla">Cumilla</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Dinajpur">Dinajpur</option>
                                            <option value="Faridpur">Faridpur</option>
                                            <option value="Jashore">Jashore</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                            <option value="Rajshahi">Rajshahi</option>
                                            <option value="Rangpur">Rangpur</option>
                                            <option value="Sylhet">Sylhet</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Division (Location)
                                        </label>
                                        <select
                                            name="locationDivision"
                                            value={formData.locationDivision}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Division</option>
                                            <option value="Barishal">Barishal</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            District
                                        </label>
                                        <select
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select District</option>
                                            <option value="Barguna">Barguna</option>
                                            <option value="Barishal">Barishal</option>
                                            <option value="Bhola">Bhola</option>
                                            <option value="Jhalokati">Jhalokati</option>
                                            <option value="Patuakhali">Patuakhali</option>
                                            <option value="Pirojpur">Pirojpur</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Upazila
                                        </label>
                                        <select
                                            name="upazila"
                                            value={formData.upazila}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Upazila</option>
                                            <option value="Bakerganj">Bakerganj</option>
                                            <option value="Gournadi">Gournadi</option>
                                            <option value="Wazirpur">Wazirpur</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Union
                                        </label>
                                        <select
                                            name="unionName"
                                            value={formData.unionName}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Union</option>
                                            <option value="Batajor">Batajor</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Block
                                        </label>
                                        <select
                                            name="block"
                                            value={formData.block}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Block</option>
                                            <option value="Batajor">Batajor</option>
                                            <option value="Candrahar">Candrahar</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Latitude / Longitude */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Latitude
                                        </label>
                                        <input
                                            type="text"
                                            name="latitude"
                                            value={formData.latitude}
                                            onChange={handleChange}
                                            placeholder="e.g., 23.8103"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Longitude
                                        </label>
                                        <input
                                            type="text"
                                            name="longitude"
                                            value={formData.longitude}
                                            onChange={handleChange}
                                            placeholder="e.g., 90.4125"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="w-full p-3 rounded-lg text-white font-medium transition-colors bg-green-500 hover:bg-green-600"
                                        >
                                            Get Current Location
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Account Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Status
                                        </label>
                                        <div className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {user.user?.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <div className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {user.user?.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg text-white font-medium transition-colors bg-blue-500 hover:bg-blue-600"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
