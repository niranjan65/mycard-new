import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
    const location = useLocation();
    console.log('ProtectedRoute user:', location);
  if (!user || user === "null" || user === "Guest") {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};

export default ProtectedRoute;
