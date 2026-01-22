import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: <MdDashboard size={20} />, path: "" },
    { name: "Projects", icon: <FaBuilding size={20} />, path: "projects" },
    {
      name: "Vouchers",
      icon: <BsFillTicketPerforatedFill size={20} />,
      path: "vouchers",
    },
    { name: "Reports", icon: <TbReportSearch size={20} />, path: "reports" },
  ];

  return (
    <aside className="w-64 bg-panel min-h-screen p-5 border-r border-gray-700">
      <div>
        <h1 className="text-white text-2xl font-semibold">Plot Point</h1>
        <p className="text-gray-500 text-sm">Admin Panel</p>
      </div>

      <nav className="mt-8 space-y-3">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-[#1F2937]"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
