import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  GoHome,
} from "react-icons/go";
import {
  LuNotepadText,
} from "react-icons/lu";
import {
  MdLogout,
  MdOutlineDataThresholding,
  MdAddchart,
} from "react-icons/md";
import {
  CiSettings,
  CiWarning,
  CiCloud,
} from "react-icons/ci";
import {
  FaRegUserCircle,
  FaUsers,
  FaCloudMoonRain,
  FaDatabase,
  FaBug,
  FaSeedling,
} from "react-icons/fa";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuBtn =
    "cursor-pointer flex items-center justify-between w-full px-4 py-2 hover:bg-[#035555] rounded-lg transition";

  const subMenu =
    "pl-12 mt-2 space-y-2 overflow-hidden transition-all duration-300";

  const navItem = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive ? "bg-[#035555]" : "hover:bg-[#035555]"
    }`;

  const subNavItem = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#035555] transition ${
      isActive ? "bg-[#035555]" : ""
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
          <NavLink to="/" className={navItem}>
            <GoHome className="w-5 h-5" />
            Dashboard
          </NavLink>
        </li>

        {/* Add / View Data */}
        <li>
          <NavLink to="/add-data" className={navItem}>
            <MdAddchart className="w-5 h-5" />
            Add Data
          </NavLink>
        </li>

        <li>
          <NavLink to="/view-data" className={navItem}>
            <FaDatabase className="w-5 h-5" />
            View Data
          </NavLink>
        </li>

        {/* Experimental Data */}
        <li>
          <button onClick={() => toggleMenu("experiment")} className={menuBtn}>
            <div className="flex items-center gap-3">
              <FaSeedling className="w-5 h-5" />
              Experimental Data
            </div>
            {openMenu === "experiment" ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowForward />
            )}
          </button>

          <ul className={`${subMenu} ${openMenu === "experiment" ? "max-h-40" : "max-h-0"}`}>
            <li>
              <NavLink to="/create-dataset" className={subNavItem}>
                Create Dataset
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-datasets" className={subNavItem}>
                Manage Datasets
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore-datasets" className={subNavItem}>
                Explore Datasets
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Survey */}
        <li>
          <button onClick={() => toggleMenu("survey")} className={menuBtn}>
            <div className="flex items-center gap-3">
              <LuNotepadText className="w-5 h-5" />
              Survey
            </div>
            {openMenu === "survey" ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>

          <ul className={`${subMenu} ${openMenu === "survey" ? "max-h-96" : "max-h-0"}`}>
            <li>
              <NavLink to="/survey/growth-stage" className={subNavItem}>
                <FaSeedling className="w-4 h-4" />
                Growth Stage Survey
              </NavLink>
            </li>
            <li>
              <NavLink to="/survey/disease" className={subNavItem}>
                <FaBug className="w-4 h-4" />
                Disease Survey
              </NavLink>
            </li>
            <li>
              <NavLink to="/survey/insect" className={subNavItem}>
                <FaBug className="w-4 h-4" />
                Insect Survey
              </NavLink>
            </li>
            <li>
              <NavLink to="/survey/climate-incidence" className={subNavItem}>
                <FaCloudMoonRain className="w-4 h-4" />
                Climate Incidence Survey
              </NavLink>
            </li>
            <li>
              <NavLink to="/survey/questionnaire" className={subNavItem}>
                Questionnaire Survey
              </NavLink>
            </li>
            <li>
              <NavLink to="/survey/submit-questionnaire" className={subNavItem}>
                Submit Questionnaire
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Data Visualization */}
        <li>
          <button onClick={() => toggleMenu("visual")} className={menuBtn}>
            <div className="flex items-center gap-3">
              <MdOutlineDataThresholding className="w-5 h-5" />
              Data Visualization
            </div>
            {openMenu === "visual" ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>

          <ul className={`${subMenu} ${openMenu === "visual" ? "max-h-40" : "max-h-0"}`}>
            <li>
              <NavLink to="/hazard-calendar" className={subNavItem}>
                <CiCloud className="w-4 h-4" />
                Hazard Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/survey-responses" className={subNavItem}>
                View Survey Responses
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Secondary Source */}
        <li>
          <NavLink to="/secondary-source" className={navItem}>
            Secondary Source
          </NavLink>
        </li>

        {/* About */}
        <li>
          <NavLink to="/about" className={navItem}>
            <CiWarning className="w-5 h-5" />
            About
          </NavLink>
        </li>

        {/* Settings */}
        <li>
          <button onClick={() => toggleMenu("settings")} className={menuBtn}>
            <div className="flex items-center gap-3">
              <CiSettings className="w-5 h-5" />
              Settings
            </div>
            {openMenu === "settings" ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>

          <ul className={`${subMenu} ${openMenu === "settings" ? "max-h-96" : "max-h-0"}`}>
            <li><NavLink to="/user-approval" className={subNavItem}><FaUsers /> User Approval</NavLink></li>
            <li><NavLink to="/change-user-details" className={subNavItem}><FaUsers /> Change User Details</NavLink></li>
            <li><NavLink to="/data-access-requests" className={subNavItem}><FaUsers /> Secondary Source Requests</NavLink></li>
            <li><NavLink to="/change-password" className={subNavItem}><FaUsers /> Change Password</NavLink></li>
            <li><NavLink to="/roles" className={subNavItem}><FaUsers /> Role</NavLink></li>
            <li><NavLink to="/role-permission" className={subNavItem}><FaUsers /> Role Permission</NavLink></li>
          </ul>
        </li>

        {/* Profile */}
        <li>
          <NavLink to="/profile" className={navItem}>
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
