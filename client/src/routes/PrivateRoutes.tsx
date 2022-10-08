import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import Cookies from "js-cookie";

export const PrivateRoutes = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  //console.log(typeof isLogged);

  const auth = { token: isLogged };

  return auth.token ? <Outlet /> : <Navigate to={"/"} />;
};
