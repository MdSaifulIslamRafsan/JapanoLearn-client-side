import { useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarLinks = (
    <>
      <li>
        <NavLink
          to="lessons"
          className="hover:bg-gray-700 p-2 rounded-md block"
        >
          Lessons
        </NavLink>
      </li>
      <li>
        <NavLink
          to="add-lessons"
          className="hover:bg-gray-700 p-2 rounded-md block"
        >
          Add Lessons
        </NavLink>
      </li>
      <li>
        <NavLink
          to="add-vocabularies"
          className="hover:bg-gray-700 p-2 rounded-md block"
        >
          Add Vocabularies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="manage-users"
          className="hover:bg-gray-700 p-2 rounded-md block"
        >
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="lesson-management"
          className="hover:bg-gray-700 p-2 rounded-md block"
        >
          Lesson Management
        </NavLink>
      </li>
      <li>
        <NavLink
          to="vocabulary-management"
          className="hover:bg-gray-700 p-2 rounded-md block"
        >
          Vocabulary Management
        </NavLink>
      </li>
    </>
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0  lg:block`}
      >
        <h2 className="text-2xl font-semibold">~日本~ Learn</h2>
        <ul className="mt-4 space-y-4">{SidebarLinks}</ul>
      </div>

      {/* Toggle button (only for small screens) */}
      <button
        className="fixed top-2 right-4 z-50 lg:hidden p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <IoCloseSharp /> : <BsMenuButtonWideFill />}
      </button>

      {/* Main content */}
      <div className="flex-1 p-3 lg:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
