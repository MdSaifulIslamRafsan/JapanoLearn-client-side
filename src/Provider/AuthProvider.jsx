import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Cookies from "js-cookie";  

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const token = Cookies.get("token");
    if(token) {
      setToken(token);
    }

    console.log("Token from cookie:", token);  
    const handleCurrentUser = () => {
      setLoading(true);


      axiosPublic
        .get("/api/auth/currentUser", { 
          withCredentials: true,
        })
        .then((res) => {
          if (res?.status === 200) {
            setUser(res.data.data);
          }
        })
        .catch((error) => {
          setUser(null);
          Swal.fire({
            title: "Oops...!",
            text: error?.response?.data?.message || error?.message,
            icon: "error",
            timer: 2000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    handleCurrentUser();
  }, [axiosPublic, token]);

  const userInfo = { user, loading };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

// Define PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
