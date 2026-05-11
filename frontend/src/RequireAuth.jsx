import React from "react";
import useAuth from "./hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation()

  return auth?.Roles?.find((roles) => allowedRoles.includes(roles)) ? (
    <Outlet />
  ) : auth?.userName ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default RequireAuth;
