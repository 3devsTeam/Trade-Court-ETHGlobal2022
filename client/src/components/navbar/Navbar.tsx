import React, { useEffect } from "react";
import { Logo } from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";
import { useAccount, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/user.services";
import Cookies from "js-cookie";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const Navbar = () => {
  const { setLogged } = useActions();
  const { isConnected, isDisconnected, address, connector } = useAccount();

  const message = "login";

  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message,
  });

  const { isLogged } = useTypedSelector((state) => state.userReducer);

  if (isSuccess) {
    //console.log(data);
    UserService.login({
      address,
      messageRaw: message,
      signature: data,
    }).then(() => {
      if (Cookies.get("jwt")) {
        setLogged(true);
      }
    });
  }

  useEffect(() => {
    if (connector && isConnected && !Cookies.get("jwt")) {
      signMessage();
    }
  }, [isConnected, connector]);

  useEffect(() => {
    if (Cookies.get("jwt")) {
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    if (isDisconnected) {
      setLogged(false);

      UserService.logout();
    }
  }, [isDisconnected]);

  return (
    <nav>
      <div className={"p-5 flex justify-between items-center w-full"}>
        <Logo />

        {isLogged && (
          <div className={"flex items-center gap-10"}>
            <NavLink route={"/"} name={"Home"} />
            <NavLink route={"/profile"} name={"Profile"} />
            <NavLink route={"/create-offer"} name={"Create offer"} />
            <NavLink route={"/settings"} name={"Settings"} />
          </div>
        )}

        <ConnectButton />
      </div>
    </nav>
  );
};
