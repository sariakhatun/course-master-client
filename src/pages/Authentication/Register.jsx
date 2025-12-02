import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ThemeContext } from "../../context/ThemeContext";
import LottieAnimation from "../../shared/Animation/LottieAnimation";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [error, setError] = useState(""); // <-- error state
  let navigate = useNavigate();
  let location = useLocation();
    let from = location.state?.from || "/";


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { createUser, updateUserProfile } = useAuth();

  const onSubmit = (data) => {
    console.log("data from register", data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log("User created:", result.user);

        // 🔥 MUST update displayName here
        return updateUserProfile({
          displayName: data.name,
          photoURL: data.photo || "", // optional
        });
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((err) => {
        console.error(err);

        // Show user-friendly error messages
        if (err.code === "auth/email-already-in-use") {
          setError("This email is already registered. Please login.");
        } else if (err.code === "auth/weak-password") {
          setError("Password is too weak. Try a stronger one.");
        } else if (err.code === "auth/invalid-email") {
          setError("Invalid email address.");
        } else {
          setError(err.message); // fallback
        }

        // Optional: SweetAlert2 popup
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
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
        {/* Register Card */}
        <div
          className={`card w-full max-w-sm shrink-0 shadow-2xl ${
            isDarkMode ? "bg-indigo-900 text-white" : "bg-purple-100"
          }`}
        >
          <div onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Create Your Account!
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`input w-full ${
                    isDarkMode ? "bg-indigo-950 text-white" : "bg-purple-50"
                  }`}
                  placeholder="Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>
              {/* photo */}
              {/* <div>
                <label className="label">Photo</label>
                <input
                  type="file"
                
                  className="input"
                  placeholder="Your Photo"
                />
              </div> */}
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
                Register
              </button>
              <p>
                <small>
                  Already have an account?
                  <Link to="/login" className="btn btn-xs btn-link -ml-2">
                    <span className={isDarkMode ? "text-purple-400" : ""}>
                      Login
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

export default Register;
