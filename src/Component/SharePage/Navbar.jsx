import { Link } from "react-router-dom";

const Navbar = () => {
  const NavLinks = (
    <>
        <li>
          <Link to={"/lessons"}>Lessons</Link>
        </li>
        <li>
          <Link to={"/tutorials"}>Tutorials</Link>
        </li>
    </>
  );

  return (
    <div className="navbar container mx-auto  lg:px-10 ">
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
        <Link to="/" className="sm:text-xl font-bold">Japano Learn</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
      </div>
      <div className="navbar-end space-x-3 sm::space-x-5">
        <Link
          to={"/login"}
          className="btn bg-primary text-white hover:bg-primary"
        >
          Sign in
        </Link>
        <Link
          to={"/signup"}
          className="btn bg-primary text-white hover:bg-primary"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
