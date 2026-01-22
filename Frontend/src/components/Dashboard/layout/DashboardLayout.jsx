import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bgColor">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* Dynamic Right Section */}
        <main className="flex-1 p-6 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
