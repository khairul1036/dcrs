import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    IoIosArrowDown,
    IoIosArrowForward,
} from "react-icons/io";
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
    const { logout, hasPermission } = useAuth();
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const submenuClass = (menu) =>
        `pl-12 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${openMenu === menu ? "max-h-96" : "max-h-0"
        }`;

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-[#035555]" : "hover:bg-[#035555]"
        }`;

    const subLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive ? "bg-[#035555]" : "hover:bg-[#035555]"
        }`;

    // ─────────────────────────────────────────────
    //  Permission checks for each section / item
    // ─────────────────────────────────────────────

    // Basic / always visible (or very common)
    const canDashboard = true; // or hasPermission("Dashboard") if you add it
    const canAddData = hasPermission("Add Data");
    const canViewData = hasPermission("View Data");

    // Experimental Data section
    const canExperimental =
        hasPermission("Dataset Create") ||
        hasPermission("Dataset View") || // assuming "Dataset View" covers manage/explore
        hasPermission("Dataset Edit") ||
        hasPermission("Dataset Delete");

    // Survey section
    const canSurvey =
        hasPermission("Growth Stage Add") || hasPermission("Growth Stage Edit") ||
        hasPermission("Disease Survey Add") || hasPermission("Disease Survey Edit") ||
        hasPermission("Insect Survey Add") || hasPermission("Insect Survey Edit") ||
        hasPermission("Questionnaire Survey Add") ||
        hasPermission("Survey Submit") ||
        hasPermission("Survey View");

    // Data Visualization
    const canVisualization =
        hasPermission("Climate Visualization") ||
        hasPermission("Survey Responses") ||
        hasPermission("Reports"); // if Hazard Calendar belongs here

    // Others
    const canSecondary = hasPermission("Secondary Source View");
    const canAbout = true; // usually public
    const canSettings =
        hasPermission("User Approval") ||
        hasPermission("User Edit") ||
        hasPermission("Data Access Requests") ||
        hasPermission("Change Password") ||
        hasPermission("Roles") ||
        hasPermission("Permissions") ||
        hasPermission("Settings");

    const canProfile = hasPermission("Profile") || true;

    return (
        <div className="h-screen w-72 bg-[#026666] text-white flex flex-col z-50">
            {/* Logo */}
            <div className="flex flex-col items-center py-6">
                <img src="/logo.png" alt="Logo" className="w-16" />
                <h1 className="font-bold text-lg mt-2">BRRI</h1>
            </div>

            <hr className="border-gray-400 mx-4" />

            <ul className="flex-1 overflow-y-auto px-2 space-y-2 mt-4 scrollbar-hide">
                {/* Dashboard */}
                {canDashboard && (
                    <li>
                        <NavLink to="/" className={linkClass}>
                            <GoHome className="w-5 h-5" />
                            Dashboard
                        </NavLink>
                    </li>
                )}

                {/* Add Data */}
                {canAddData && (
                    <li>
                        <NavLink to="/add-data" className={linkClass}>
                            <CiCirclePlus className="w-5 h-5" />
                            Add Data
                        </NavLink>
                    </li>
                )}

                {/* View Data */}
                {canViewData && (
                    <li>
                        <NavLink to="/view-data" className={linkClass}>
                            <MdViewList className="w-5 h-5" />
                            View Data
                        </NavLink>
                    </li>
                )}

                {/* Experimental Data */}
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
                                <li>
                                    <NavLink to="/dataset/create" className={subLinkClass}>
                                        <CiCirclePlus className="w-4 h-4" />
                                        Create Dataset
                                    </NavLink>
                                </li>
                            )}
                            {(hasPermission("Dataset View") || hasPermission("Dataset Edit")) && (
                                <li>
                                    <NavLink to="/dataset/manage" className={subLinkClass}>
                                        <MdViewList className="w-4 h-4" />
                                        Manage Datasets
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Dataset View") && (
                                <li>
                                    <NavLink to="/dataset/explore" className={subLinkClass}>
                                        <MdOutlineDataThresholding className="w-4 h-4" />
                                        Explore Datasets
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>
                )}

                {/* Survey */}
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
                            {(hasPermission("Growth Stage Add") || hasPermission("Growth Stage Edit")) && (
                                <li>
                                    <NavLink to="/survey/growth" className={subLinkClass}>
                                        <FaLeaf className="w-4 h-4" />
                                        Growth Stage Survey
                                    </NavLink>
                                </li>
                            )}
                            {(hasPermission("Disease Survey Add") || hasPermission("Disease Survey Edit")) && (
                                <li>
                                    <NavLink to="/survey/disease" className={subLinkClass}>
                                        <FaBug className="w-4 h-4" />
                                        Disease Survey
                                    </NavLink>
                                </li>
                            )}
                            {(hasPermission("Insect Survey Add") || hasPermission("Insect Survey Edit")) && (
                                <li>
                                    <NavLink to="/survey/insect" className={subLinkClass}>
                                        <FaBug className="w-4 h-4" />
                                        Insect Survey
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Climate Incidence Survey") && ( // if you have this perm
                                <li>
                                    <NavLink to="/survey/climate" className={subLinkClass}>
                                        <FaCloudMoonRain className="w-4 h-4" />
                                        Climate Incidence Survey
                                    </NavLink>
                                </li>
                            )}
                            {(hasPermission("Questionnaire Survey Add") || hasPermission("Questionnaire Survey Edit")) && (
                                <li>
                                    <NavLink to="/survey/questionnaire" className={subLinkClass}>
                                        <LuNotepadText className="w-4 h-4" />
                                        Questionnaire Survey
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Survey Submit") && (
                                <li>
                                    <NavLink to="/survey/submit" className={subLinkClass}>
                                        <MdAddchart className="w-4 h-4" />
                                        Submit Questionnaire Survey
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>
                )}

                {/* Data Visualization */}
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
                            {hasPermission("Climate Visualization") && (
                                <li>
                                    <NavLink to="/hazard-calendar" className={subLinkClass}>
                                        <CiCloud className="w-4 h-4" />
                                        Hazard Calendar
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Survey Responses") && (
                                <li>
                                    <NavLink to="/survey-responses" className={subLinkClass}>
                                        <MdViewList className="w-4 h-4" />
                                        View Survey Responses
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>
                )}

                {/* Secondary Source */}
                {canSecondary && (
                    <li>
                        <NavLink to="/secondary-source" className={linkClass}>
                            <LuDatabase className="w-5 h-5" />
                            Secondary Source
                        </NavLink>
                    </li>
                )}

                {/* About */}
                {canAbout && (
                    <li>
                        <NavLink to="/about" className={linkClass}>
                            <CiWarning className="w-5 h-5" />
                            About
                        </NavLink>
                    </li>
                )}

                {/* Settings */}
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
                            {hasPermission("User Approval") && (
                                <li>
                                    <NavLink to="/user-approval" className={subLinkClass}>
                                        <FaUsers className="w-4 h-4" />
                                        User Approval
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("User Edit") && (
                                <li>
                                    <NavLink to="/change-user-details" className={subLinkClass}>
                                        <FaUsers className="w-4 h-4" />
                                        Change User Details
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Data Access Requests") && (
                                <li>
                                    <NavLink to="/data-access-requests" className={subLinkClass}>
                                        <FaUsers className="w-4 h-4" />
                                        Secondary Source Requests
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Change Password") && (
                                <li>
                                    <NavLink to="/update-password" className={subLinkClass}>
                                        <FaUsers className="w-4 h-4" />
                                        Change Password
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Roles") && (
                                <li>
                                    <NavLink to="/roles" className={subLinkClass}>
                                        <FaUsers className="w-4 h-4" />
                                        Role
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission("Permissions") && (
                                <li>
                                    <NavLink to="/role-permission" className={subLinkClass}>
                                        <FaUsers className="w-4 h-4" />
                                        Role Permission
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>
                )}

                {/* Profile */}
                {canProfile && (
                    <li>
                        <NavLink to="/profile" className={linkClass}>
                            <FaRegUserCircle className="w-5 h-5" />
                            Profile
                        </NavLink>
                    </li>
                )}
            </ul>

            {/* Logout – usually always visible */}
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