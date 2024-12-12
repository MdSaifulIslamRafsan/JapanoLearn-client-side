import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";

const AdminRoute = ({children}) => {
  const { user, loading } = useAuth();
  console.log(user)
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
         <HashLoader size={200} />
      </div>
    );
  }
  if (user && user?.role == "admin") {
    return children;
  }
  return <Navigate state={{ from: location }} to={"/login"}></Navigate>;
};
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired, 
  };


export default AdminRoute;