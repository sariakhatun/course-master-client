import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoadingRole(true);

    axiosSecure
      .get(`/api/users/${user.email}`) // fetch user from DB
      .then(res => {
        setRole(res.data.data.role); // set role from DB
        setLoadingRole(false);
      })
      .catch(err => {
        console.error("Error fetching user role:", err);
        setRole("student"); // fallback role
        setLoadingRole(false);
      });
  }, [user?.email, axiosSecure]);

  return { role, loadingRole };
};

export default useUserRole;
