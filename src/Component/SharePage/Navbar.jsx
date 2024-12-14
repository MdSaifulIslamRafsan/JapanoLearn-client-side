import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user  } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleLogout = async () => {
    try {
      const response = await axiosPublic.get("/api/auth/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Logout",
          text: response?.data?.message,
          icon: "success",
          timer: 3000,
        });
        setTimeout(()=>{
          location.reload();
        }, 3000)

      }
    } catch (error) {
      Swal.fire({
        title: "Oops...!",
        text: error?.response?.data?.message || error?.message,
        icon: "error",
        timer: 3000,
      });
    }
  };

  const NavLinks = (
    <>
      <li>
        <Link to={"/lessons"}>Lessons</Link>
      </li>
      <li>
        <Link to={"/tutorials"}>Tutorials</Link>
      </li>
      {
        user?.role === 'admin' && <li>
        <Link to={"/dashboard/lessons"}>Dashboard</Link>
      </li>
      }
    </>
  );

  return (
    <div className="navbar container mx-auto lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {NavLinks}
          </ul>
        </div>
        <Link to="/" className="sm:text-xl font-bold">
          ~日本~ Learn
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
      </div>
      <div className="navbar-end space-x-3 sm::space-x-5">
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn bg-primary text-white hover:bg-primary"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="btn bg-primary text-white hover:bg-primary"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn bg-primary text-white hover:bg-primary"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
