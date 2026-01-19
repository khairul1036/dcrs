import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#026666] transform transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <Sidebar />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Right side */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <div className="shrink-0">
                    <div className="flex items-center w-full bg-[#ffffff] shadow px-4 h-16 sticky top-0 z-50">
                        {/* Drawer toggle (mobile) */}
                        <div className="flex-none lg:hidden mr-4">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                                {sidebarOpen ? (
                                    <FaTimes className="w-6 h-6" />
                                ) : (
                                    <FaBars className="w-6 h-6" />
                                )}
                            </button>
                        </div>

                        {/* Title */}
                        <div className="text-center flex-1">
                            <p className="text-base md:text-2xl font-semibold text-gray-900">
                                Data Collection &amp; Repository System
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
