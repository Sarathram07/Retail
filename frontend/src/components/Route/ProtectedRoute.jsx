import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoaderComponent from "../Layouts/LoaderComponent";

const ProtectedRoute = (props) => {
  const { children, isAdmin } = props;
  const {
    isAuthenticated,
    isLoading,
    user: loginUser,
  } = useSelector((state) => state.authState);

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated) {
    if (isAdmin === true && loginUser.role !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }
    return children; // children of "ProtectedRoute" route
  }

  if (isLoading) {
    return <LoaderComponent />;
  }
};

export default ProtectedRoute;
