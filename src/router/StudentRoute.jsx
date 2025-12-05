import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const StudentRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "student") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-yellow-100 rounded shadow-lg">
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">
            ⚠️ Access Denied
          </h1>
          <p className="text-yellow-600">
            Only students can access this page.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default StudentRoute;
