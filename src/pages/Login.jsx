import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const { refetch } = useAuth();
  const axiosPublic = useAxiosPublic()
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true)
    const userData = {
      email: data?.email,
      password: data?.password,
    };
    axiosPublic
    .post("/api/auth/login", userData , {withCredentials: true})
    .then((res) => {
      
        if (res?.status === 200) {
          Swal.fire({
            title: "Welcome Back!",
            text: res?.data?.message,
            icon: "success",
            timer: 3000,
          });
          refetch()
          console.log(res?.data?.data?.user?.role)
          navigate(res?.data?.data?.user?.role === "admin" ? "/dashboard/lessons" : "/lessons")
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops...!",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
          timer: 3000,
        });
        setLoading(false)
      });
   
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Pane */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <img src="login&register.svg" alt="sign-in image" />
        </div>
      </div>

      {/* Right Pane */}
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Sign In
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Welcome back! Please log in to your account.
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
              >
                {loading ? <BeatLoader size={15} /> : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              {`Don't`} have an account? <Link to="/signup">Sign Up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;