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

const Sidebar = () => {
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
                <li>
                    <NavLink to="/" className={linkClass}>
                        <GoHome className="w-5 h-5" />
                        Dashboard
                    </NavLink>
                </li>

                {/* Add Data */}
                <li>
                    <NavLink to="/add-data" className={linkClass}>
                        <CiCirclePlus className="w-5 h-5" />
                        Add Data
                    </NavLink>
                </li>

                {/* View Data */}
                <li>
                    <NavLink to="/view-data" className={linkClass}>
                        <MdViewList className="w-5 h-5" />
                        View Data
                    </NavLink>
                </li>

                {/* Experimental Data */}
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
                        <li>
                            <NavLink to="/dataset/create" className={subLinkClass}>
                                <CiCirclePlus className="w-4 h-4" />
                                Create Dataset
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dataset/manage" className={subLinkClass}>
                                <MdViewList className="w-4 h-4" />
                                Manage Datasets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dataset/explore" className={subLinkClass}>
                                <MdOutlineDataThresholding className="w-4 h-4" />
                                Explore Datasets
                            </NavLink>
                        </li>
                    </ul>
                </li>

                {/* Survey */}
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
                        <li>
                            <NavLink to="/survey/growth" className={subLinkClass}>
                                <FaLeaf className="w-4 h-4" />
                                Growth Stage Survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/survey/disease" className={subLinkClass}>
                                <FaBug className="w-4 h-4" />
                                Disease Survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/survey/insect" className={subLinkClass}>
                                <FaBug className="w-4 h-4" />
                                Insect Survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/survey/climate" className={subLinkClass}>
                                <FaCloudMoonRain className="w-4 h-4" />
                                Climate Incidence Survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/survey/questionnaire" className={subLinkClass}>
                                <LuNotepadText className="w-4 h-4" />
                                Questionnaire Survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/survey/submit" className={subLinkClass}>
                                <MdAddchart className="w-4 h-4" />
                                Submit Questionnaire Survey
                            </NavLink>
                        </li>
                    </ul>
                </li>

                {/* Data Visualization */}
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
                        <li>
                            <NavLink to="/hazard-calendar" className={subLinkClass}>
                                <CiCloud className="w-4 h-4" />
                                Hazard Calender
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/survey-responses" className={subLinkClass}>
                                <MdViewList className="w-4 h-4" />
                                View Survey Responses
                            </NavLink>
                        </li>
                    </ul>
                </li>

                {/* Secondary Source */}
                <li>
                    <NavLink to="/secondary-source" className={linkClass}>
                        <LuDatabase className="w-5 h-5" />
                        Secondary Source
                    </NavLink>
                </li>

                {/* About */}
                <li>
                    <NavLink to="/about" className={linkClass}>
                        <CiWarning className="w-5 h-5" />
                        About
                    </NavLink>
                </li>

                {/* Settings */}
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
                        <li><NavLink to="/user-approval" className={subLinkClass}><FaUsers />User Approval</NavLink></li>
                        <li><NavLink to="/change-user-details" className={subLinkClass}><FaUsers />Change User Details</NavLink></li>
                        <li><NavLink to="/data-access-requests" className={subLinkClass}><FaUsers />Secondary Source Requests</NavLink></li>
                        <li><NavLink to="/update-password" className={subLinkClass}><FaUsers />Change Password</NavLink></li>
                        <li><NavLink to="/roles" className={subLinkClass}><FaUsers />Role</NavLink></li>
                        <li><NavLink to="/role-permission" className={subLinkClass}><FaUsers />Role Permission</NavLink></li>
                    </ul>
                </li>

                {/* Profile */}
                <li>
                    <NavLink to="/profile" className={linkClass}>
                        <FaRegUserCircle className="w-5 h-5" />
                        Profile
                    </NavLink>
                </li>
            </ul>

            {/* Logout */}
            <div className="px-4 py-4">
                <button className="flex items-center gap-3 text-red-300 hover:text-white w-full">
                    <MdLogout className="w-5 h-5" />
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
