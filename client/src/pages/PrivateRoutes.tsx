import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import Cookies from "js-cookie";

export const PrivateRoutes = () => {
  const auth = { token: Cookies.get("jwt") };

  return auth.token ? <Outlet /> : <Navigate to={"/"} />;
};
