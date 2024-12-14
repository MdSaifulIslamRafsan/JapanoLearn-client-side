import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();

  const {
    data: currentUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () =>
      axiosPublic
        .get("/api/auth/currentUser", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
    enabled: loading,
  });
  useEffect(() => {
    if (currentUser?.data) {
      setUser(currentUser?.data);
      setLoading(false);
    } else {
      setUser(null);
    }
    setTimeout(() => {
      if (!user) {
        setLoading(false);
      }
    }, 3000);
  }, [currentUser?.data , user]);

  const userInfo = { user, refetch, isLoading , loading, setLoading , setUser };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

// Define PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
