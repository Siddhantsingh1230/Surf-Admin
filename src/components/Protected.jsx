import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const admin = useSelector((state) => state.auth.admin);
  if (!admin) {
    return <Navigate replace={true} to="/login" />;
  }
  return <>{children}</>;
};

export default Protected;
