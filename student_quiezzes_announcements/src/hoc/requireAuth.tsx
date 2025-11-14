import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store/slices/authSlice";

const requireAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const user = useSelector(selectUser);

    if (!user) {
      return <Navigate to="/" replace />;
    } else {

      return <Component {...props} />;
    };
  }

  return AuthenticatedComponent;
};

export default requireAuth;
