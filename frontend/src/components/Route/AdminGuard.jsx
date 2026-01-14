import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoaderComponent from "../Layouts/LoaderComponent";

const AdminGuard = () => {
  const location = useLocation();

  const {
    user: loginUser,
    isAuthenticated,
    isLoading,
  } = useSelector((state) => state.authState);

  if (isLoading) return <LoaderComponent />;

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  if (loginUser.role !== "admin")
    return <Navigate to="/unauthorized" replace state={{ from: location }} />;

  return <Outlet />;
};

export default AdminGuard;
