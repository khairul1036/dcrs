import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { LuNotepadText, LuDatabase } from "react-icons/lu";
import {
    MdAddchart,
    MdLogout,
    MdOutlineDataThresholding,
    MdViewList,
} from "react-icons/md";
import {
    CiCloud,
    CiSettings,
    CiWarning,
    CiCirclePlus,
} from "react-icons/ci";
import {
    FaCloudMoonRain,
    FaRegUserCircle,
    FaUsers,
    FaBug,
    FaLeaf,
} from "react-icons/fa";
import { useAuth } from "../../providers/AuthProvider";

const Sidebar = () => {
    const { logout, user } = useAuth();
    const permissions = user?.user?.permissions || [];

    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const hasPermission = (perm) => permissions.includes(perm);
    const hasAnyPermission = (perms) => perms.some(hasPermission);

    const submenuClass = (menu) =>
        `pl-12 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${openMenu === menu ? "max-h-96" : "max-h-0"
        }`;

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-[#035555]" : "hover:bg-[#035555]"
        }`;

    const subLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive ? "bg-[#035555]" : "hover:bg-[#035555]"
        }`;

    // Permission-based visibility (only these are conditional)
    const canAddData = hasPermission("Add Data") || hasPermission("Import Data");
    const canViewData = hasPermission("View Data") || hasPermission("Export Data");
    const canExperimental = hasAnyPermission([
        "Dataset Create", "Dataset View", "Dataset Edit", "Dataset Delete", "Dataset Share"
    ]);
    const canSurvey = hasAnyPermission([
        "Growth Stage Add", "Disease Survey Add", "Insect Survey Add",
        "Questionnaire Survey Add", "Survey Submit", "Survey View"
    ]);
    const canVisualization = hasAnyPermission([
        "Climate Visualization", "Survey Responses", "Reports"
    ]);
    const canSecondary = hasPermission("Secondary Source View") ||
        hasPermission("Secondary Source Request");
    const canSettings = hasAnyPermission([
        "User Approval", "User Edit", "Roles", "Permissions",
        "Change Password", "Data Access Requests"
    ]);

    return (
        <div className="h-screen w-72 bg-[#026666] text-white flex flex-col z-50">
            {/* Logo */}
            <div className="flex flex-col items-center py-6">
                <img src="/logo.png" alt="Logo" className="w-16" />
                <h1 className="font-bold text-lg mt-2">BRRI</h1>
            </div>

            <hr className="border-gray-400 mx-4" />

            <ul className="flex-1 overflow-y-auto px-2 space-y-2 mt-4 scrollbar-hide">
                {/* Always visible */}
                <li>
                    <NavLink to="/" className={linkClass}>
                        <GoHome className="w-5 h-5" />
                        Dashboard
                    </NavLink>
                </li>

                {/* Conditional */}
                {canAddData && (
                    <li>
                        <NavLink to="/add-data" className={linkClass}>
                            <CiCirclePlus className="w-5 h-5" />
                            Add Data
                        </NavLink>
                    </li>
                )}

                {/* Conditional */}
                {canViewData && (
                    <li>
                        <NavLink to="/view-data" className={linkClass}>
                            <MdViewList className="w-5 h-5" />
                            View Data
                        </NavLink>
                    </li>
                )}

                {/* Conditional - Experimental Data */}
                {canExperimental && (
                    <li>
                        <button
                            onClick={() => toggleMenu("experimental")}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#035555] rounded-lg transition"
                        >
                            <div className="flex items-center gap-3">
                                <LuDatabase className="w-5 h-5" />
                                Experimental Data
                            </div>
                            {openMenu === "experimental" ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </button>

                        <ul className={submenuClass("experimental")}>
                            {hasPermission("Dataset Create") && (
                                <li><NavLink to="/dataset/create" className={subLinkClass}>Create Dataset</NavLink></li>
                            )}
                            {hasAnyPermission(["Dataset View", "Dataset Edit", "Dataset Delete"]) && (
                                <li><NavLink to="/dataset/manage" className={subLinkClass}>Manage Datasets</NavLink></li>
                            )}
                            {hasPermission("Dataset View") && (
                                <li><NavLink to="/dataset/explore" className={subLinkClass}>Explore Datasets</NavLink></li>
                            )}
                        </ul>
                    </li>
                )}

                {/* Conditional - Survey */}
                {canSurvey && (
                    <li>
                        <button
                            onClick={() => toggleMenu("survey")}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#035555] rounded-lg transition"
                        >
                            <div className="flex items-center gap-3">
                                <LuNotepadText className="w-5 h-5" />
                                Survey
                            </div>
                            {openMenu === "survey" ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </button>

                        <ul className={submenuClass("survey")}>
                            {/* ... survey sub items with their own checks ... */}
                        </ul>
                    </li>
                )}

                {/* Conditional - Data Visualization */}
                {canVisualization && (
                    <li>
                        <button
                            onClick={() => toggleMenu("data")}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#035555] rounded-lg transition"
                        >
                            <div className="flex items-center gap-3">
                                <MdOutlineDataThresholding className="w-5 h-5" />
                                Data Visualization
                            </div>
                            {openMenu === "data" ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </button>

                        <ul className={submenuClass("data")}>
                            {/* ... visualization sub items ... */}
                        </ul>
                    </li>
                )}

                {/* Conditional */}
                {canSecondary && (
                    <li>
                        <NavLink to="/secondary-source" className={linkClass}>
                            <LuDatabase className="w-5 h-5" />
                            Secondary Source
                        </NavLink>
                    </li>
                )}

                {/* Always visible */}
                <li>
                    <NavLink to="/about" className={linkClass}>
                        <CiWarning className="w-5 h-5" />
                        About
                    </NavLink>
                </li>

                {/* Conditional - Settings */}
                {canSettings && (
                    <li>
                        <button
                            onClick={() => toggleMenu("settings")}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#035555] rounded-lg transition"
                        >
                            <div className="flex items-center gap-3">
                                <CiSettings className="w-5 h-5" />
                                Settings
                            </div>
                            {openMenu === "settings" ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </button>

                        <ul className={submenuClass("settings")}>
                            {/* ... settings sub items with checks ... */}
                        </ul>
                    </li>
                )}

                {/* Always visible */}
                <li>
                    <NavLink to="/profile" className={linkClass}>
                        <FaRegUserCircle className="w-5 h-5" />
                        Profile
                    </NavLink>
                </li>
            </ul>

            {/* Always visible */}
            <div className="px-4 py-4">
                <button
                    onClick={logout}
                    className="cursor-pointer flex items-center gap-3 text-red-300 hover:text-white w-full"
                >
                    <MdLogout className="w-5 h-5" />
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;