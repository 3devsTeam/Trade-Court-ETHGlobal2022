import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const PrivateRoutes = () => {
  const { isLogged } = useTypedSelector((state) => state.userReducer);

  const auth = { token: isLogged };

  return auth.token ? <Outlet /> : <Navigate to={"/"} />;
};
