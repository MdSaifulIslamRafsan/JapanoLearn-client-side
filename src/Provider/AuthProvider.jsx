import { createContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
export const AuthContext = createContext(null);

const AuthProvider = ({children }) => {

 
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const handleLogin = (userData) => {
        setLoading(true);
        axiosPublic
        .post("/api/auth/login", userData , {withCredentials: true})
        .then((res) => {
            if (res?.status === 200) {
                setLoading(false);
              Swal.fire({
                title: "Welcome Back!",
                text: res?.data?.message,
                icon: "success",
                timer: 2000,
              });
              const {user} = res.data.data;
             setUser(user);
             console.log(user);
            
    
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Oops...!",
              text: error?.response?.data?.message || error?.message,
              icon: "error",
              timer: 2000,
            });
            setLoading(false);
          });
    }



const userInfo = {handleLogin , user ,loading}

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