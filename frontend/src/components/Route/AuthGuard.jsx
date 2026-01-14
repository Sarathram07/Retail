import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoaderComponent from "../Layouts/LoaderComponent";

const AuthGuard = () => {
  const location = useLocation();

  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.authState
  );

  if (isLoading) return <LoaderComponent />;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default AuthGuard;
