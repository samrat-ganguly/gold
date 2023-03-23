import { React, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoutes = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
