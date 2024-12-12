import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsLoading(true);
    const imageFile = { image: data?.photo[0] };
    axiosPublic
      .post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const userData = {
          name: data?.username,
          email: data?.email,
          password: data?.password,
          photo: res?.data?.data?.url,
        };
        axiosPublic
          .post("/api/auth/register", userData)
          .then((res) => {
            if (res?.status === 200) {
              setIsLoading(false);
              Swal.fire({
                title: "Good job!",
                timer: 2000,
                text: res?.data?.message,
                icon: "success"
              });
              navigate("/login");
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Oops...!",
              timer: 2000,
              text: error?.response?.data?.errorSource[0]?.message || error?.message,
              icon: "error"
            });
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <img src="login&register.svg" alt="signup image" />
          </div>
        </div>
        {/* Right Pane */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign Up
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Join to Our Community with all time access and free{" "}
            </h1>
          
            <div className="mt-4 text-sm text-gray-600 text-center">
             
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="UploadPhoto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  {...register("photo", {
                    required: "Photo is required",
                    validate: {
                      validURL: (value) => value[0]?.type?.startsWith("image/") || "Photo must be a valid image URL"
                    }
                  })}
                  className="mt-2 border bg-white p-1 rounded-lg block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm">{errors.photo.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Invalid email address"
                    }
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    maxLength: { value: 20, message: "Password must not exceed 20 characters" }
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
                >
                  {isLoading ? <BeatLoader size={15} /> : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
