import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <h2> </h2>
  if (!user) return <Navigate to="/sign-in" replace />;

  return children;
};

export default PrivateRoute;
