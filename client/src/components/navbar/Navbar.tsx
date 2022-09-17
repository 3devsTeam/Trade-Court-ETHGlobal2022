import React, { useEffect } from "react";
import { Logo } from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { NavLink } from "./NavLink";
import { useAccount, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/user.services";
import Cookies from "js-cookie";

export const Navbar = () => {
  const { isConnected, isDisconnected, address } = useAccount();

  const message = "login";

  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message,
  });

  if (isSuccess) {
    console.log(data);
    UserService.userLogin({
      address,
      messageRaw: message,
      signature: data,
    });
  }

  useEffect(() => {
    if (isConnected) {
      signMessage();
    }
  }, [isConnected]);

  return (
    <nav>
      <div className={"p-5 flex justify-between items-center w-full"}>
        <Logo />

        <div className={"flex items-center gap-10"}>
          <NavLink route={"/"} name={"Home"} />
          <NavLink route={"/create-offer"} name={"Create offer"} />
          <NavLink route={"/settings"} name={"Settings"} />
        </div>

        <ConnectButton />
      </div>
    </nav>
  );
};
