import { useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarLinks = (
    <>
      <li>
        <NavLink to="lessons" className="hover:bg-gray-700 p-2 rounded-md block">
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "fixed z-50" : "hidden"
        } lg:block lg:w-64 w-64 bg-gray-800 text-white p-4 transition-all duration-300`}
      >
        <h2 className="text-2xl font-semibold">~日本~ Learn</h2>
        <div>
        <ul className="mt-4 min-h-[calc(100vh-130px)] space-y-4">{SidebarLinks}</ul>
        <button className="btn bg-red-600 text-white hover:bg-red-600 border-none w-full">LogOut</button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-3 lg:p-6">
        {/* Button to toggle sidebar on small screens */}
        <div className="fixed right-3">
          <button
            className="lg:hidden  p-2 bg-gray-800 text-white rounded-md"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <IoCloseSharp />
 : <BsMenuButtonWideFill />
            }
          </button>
        </div>

       <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
