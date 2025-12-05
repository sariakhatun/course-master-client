import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = () => {
  const { user } = useAuth();
  const { role, loadingRole } = useUserRole();

  if (!user) return <Navigate to="/login" replace />;
  if (loadingRole) return <div className="text-center mt-10">Loading...</div>;

  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-100 rounded shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Forbidden Access</h1>
          <p className="text-red-500">Only admins can view this page.</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
