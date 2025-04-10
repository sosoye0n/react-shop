import React from "react";
import { Navigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useAuth } from "../AuthContext";

const PrivateRoute = () => {
  const { authenticate } = useAuth();
  return authenticate === true ? <ProductDetail /> : <Navigate to="/login" />;
};

export default PrivateRoute;
