import React from "react";
import useUserRole from "../hooks/useUserRole";
import DashboardHome from "./DashboardHome";
import StudentDashboardHome from "./StudentDashboard/StudentDashboardHome";

const Dashboard = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <div className="text-center mt-10">Loading...</div>;

  return <div>{role === "admin" ? <DashboardHome /> : <StudentDashboardHome />}</div>;
};

export default Dashboard;
