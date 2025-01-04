import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../services/authService";
import { setUser } from "../store/userSlice";
import Sidebar from "./Sidebar";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const authenticateUser = async () => {
    const basePath = window.location.pathname.includes("/admin")
      ? "admin"
      : window.location.includes("teacher")
      ? "teacher"
      : "student";
    if (!user) {
      const response = await checkAuth();
      if (response.data.isAuthenticated) {
        dispatch(setUser(response.data.user));
      }
    }

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to={`/${basePath}/login`} replace />;
    }
  };

  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};

export default ProtectedRoute;
