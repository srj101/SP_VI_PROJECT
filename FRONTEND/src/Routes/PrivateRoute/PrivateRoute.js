import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, token, pending } = useContext(AuthContext); //getting Current user from AuthContext
  const router = useNavigate(); //getting Current router from useNavigate
  const location = useLocation(); //getting Current location from useLocation

  if (loading && pending) {
    return <Loading></Loading>;
  }

  // if (
  //   !pending &&
  //   !loading &&
  //   !user &&
  //   !token &&
  //   location.pathname !== "/login" &&
  //   location.pathname !== "/sign-up"
  // ) {
  //   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  // }

  if (user) {
    return children;
  }
};

export default PrivateRoute;
