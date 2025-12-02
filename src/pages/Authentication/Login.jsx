import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ThemeContext } from "../../context/ThemeContext";
import LottieAnimation from "../../shared/Animation/LottieAnimation";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  let {loginUser}=useAuth();
  let location = useLocation()
  console.log(location)
  let from = location.state?.from || '/'
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let onSubmit = (data) => {
  setError(""); // reset old errors

  loginUser(data.email, data.password)
    .then(res => {
      console.log(res.user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from);
    })
    .catch(err => {
      console.log(err);

      // Show friendly error messages
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Login failed. Please check your credentials.");
      }

      // Optional SweetAlert popup
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    });
};

  return (
    <div
      className={`mt-24 mb-12 max-w-6xl mx-auto min-h-[70vh] flex items-center ${
        isDarkMode ? "" : ""
      }`}
    >
      <div className="flex px-6 lg:px-30 flex-col-reverse lg:flex-row gap-12 md:justify-baseline w-full">
        {/* Login Card */}
        <div
          className={`card w-full max-w-sm shrink-0 shadow-2xl ${
            isDarkMode ? "bg-indigo-900 text-white" : "bg-purple-100"
          }`}
        >
          <div onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Login Your Account!
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={`input w-full ${
                    isDarkMode ? "bg-indigo-950 text-white" : "bg-purple-50"
                  }`}
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true.valueOf,
                    minLength: 6,
                  })}
                  className={`input w-full ${
                    isDarkMode ? "bg-indigo-950 text-white" : "bg-purple-50"
                  }`}
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password must be 6 characters or longer
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div>
                <a
                  className={`link link-hover ${
                    isDarkMode ? "text-blue-100" : ""
                  }`}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn w-full mt-4 btn-outline  ${
                  isDarkMode
                    ? "bg-indigo-950 text-white border-white hover:bg-blue-500"
                    : "hover:bg-purple-200 bg-purple-100"
                }`}
              >
                Login
              </button>
              <p>
                <small>
                  Don't have an account?
                  <Link to="/register" className="btn btn-xs btn-link -ml-2">
                    <span className={isDarkMode ? "text-purple-400" : ""}>
                      Register
                    </span>
                  </Link>{" "}
                </small>
              </p>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="flex-1 flex items-center justify-center">
          <LottieAnimation loop={true} style={{ width: 400, height: 400 }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
