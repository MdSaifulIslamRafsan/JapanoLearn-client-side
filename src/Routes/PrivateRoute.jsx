import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { HashLoader } from "react-spinners";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { user, isLoading , loading } = useAuth();
  const location = useLocation();

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <HashLoader size={200} />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;

};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
